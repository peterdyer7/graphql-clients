import React from 'react';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

import ApolloTodoHooks from '../ApolloTodoHooks/ApolloTodoHooks';
import aws_config from '../aws-exports';

const httpLink = createHttpLink({
  uri: aws_config.aws_appsync_graphqlEndpoint
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-api-key': aws_config.aws_appsync_apiKey
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function ApolloTodoWithProvider() {
  return (
    <ApolloProvider client={client}>
      <ApolloTodoHooks />
    </ApolloProvider>
  );
}
