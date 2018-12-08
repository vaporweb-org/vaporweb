import { html } from 'common-tags';

export function header() {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head> </head>
      <body>
        <div id="root">hello world`; // eslint-disable-line
}

export function footer({ assets }) {
  return html`</div>
        <script src=${assets['client.js']}></script>
      </body>
    </html>
  `;
}
