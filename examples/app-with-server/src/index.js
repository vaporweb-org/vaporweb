import http from 'http';
import app from './server';

let currentApp = app;

const server = http.createServer(currentApp);

server.listen(3000);

server.on('listening', () => {
  console.info(`🚀  Started on port ${3000}`);
});

server.on('error', err => {
  console.error(err);
});

if (module.hot) {
  console.info('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.info('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
