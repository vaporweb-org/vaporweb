import { html } from 'common-tags';

export function header() {
  // prettier-ignore
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head> </head>
      <body>
        <div id="root"></div>
  `;
}

export function footer({ assets, data }) {
  return html`
        </div>
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(data)};
        </script>
        <script src="${assets['client.js']}"></script>
      </body>
    </html>
  `;
}
