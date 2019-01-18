import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';

const apolloState = window.__APOLLO_STATE__;
delete window.__APOLLO_STATE__;

const client = new ApolloClient({
  link: createHttpLink({
    credentials: 'same-origin',
    uri: '/graphql',
  }),
  cache: new InMemoryCache().restore(apolloState),
});

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
