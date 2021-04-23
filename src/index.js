/**
 * Caution: Consider this file when using react-scripts
 *
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import { gql } from 'apollo-boost';
import { store } from './app/store';
import { Provider } from 'react-redux';

const client = new ApolloClient({
  uri: 'https://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,

  document.getElementById('root')
);

serviceWorker.unregister();
