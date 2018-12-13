import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import React from 'react';

import App from './components/App';

import { render } from './services/renderer';

const app = express();

app.use(express.static(path.resolve('.', 'dist', 'public')));

app.use('*', (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: 'http://localhost:3010',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

  const Root = (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  render(Root, { client, req, res });
});

export default app;
