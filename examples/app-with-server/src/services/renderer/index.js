import { renderToNodeStream } from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';

import { header, footer } from './html';

export async function render(Root, { client, req, res }) {
  res.write(header());

  await getDataFromTree(Root);

  const data = client.extract();
  const stream = renderToNodeStream(Root);

  stream.pipe(
    res,
    { end: false }
  );

  const assets = require('../../../dist/public/manifest.json');

  stream.on('end', () => {
    res.end(footer({ data, assets }));
  });
}
