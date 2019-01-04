import { html } from 'common-tags';

export function header() {
  // prettier-ignore
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head></head>
      <body>
        <div id="root">
  `;
}

export function footer({ assets, data }) {
  return html`
        </div>
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(data)};
        </script>
        ${Object.keys(assets).map(script =>
          assets[script].js
            ? `<script src="${assets[script].js}"></script>`
            : ''
        )}
      </body>
    </html>
  `;
}
