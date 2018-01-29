import ReactDOM from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './components/app/App.jsx';
import 'normalize.css';
import './styles.css';

const myclient = new ApolloClient({
  link: new HttpLink({ uri: `/graphql` }),
  cache: new InMemoryCache()
});

const app = (
  <ApolloProvider client={myclient}>
    <App/>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
