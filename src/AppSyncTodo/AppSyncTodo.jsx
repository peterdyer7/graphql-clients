import React from 'react';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import ApolloTodo from '../ApolloTodo/ApolloTodo';
import aws_config from '../aws-exports';

const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: aws_config.aws_appsync_authenticationType,
    apiKey: aws_config.aws_appsync_apiKey
  }
  // disableOffline: true
});

export default function AppSyncTodoWithProvider() {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <ApolloTodo />
      </Rehydrated>
    </ApolloProvider>
  );
}
