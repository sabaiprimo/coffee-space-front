import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ApolloProvider } from '@apollo/client/react';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { client } from './helpers/apollo';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
