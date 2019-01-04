import { renderToNodeStream } from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';

import { header, footer } from './html';

/* eslint-disable-next-line no-unused-vars */
export async function render(Root, { client, req, res }) {
  res.write(header());

  await getDataFromTree(Root);

  const data = client.extract();
  const stream = renderToNodeStream(Root);

  stream.pipe(
    res,
    { end: false }
  );

  const assets = require(process.env.VW_APP_MANIFEST);

  stream.on('end', () => {
    res.end(footer({ data, assets }));
  });
}
