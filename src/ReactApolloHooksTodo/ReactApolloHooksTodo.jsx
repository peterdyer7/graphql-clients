import React from 'react';
import {
  Header,
  Container,
  Dimmer,
  Loader,
  Segment,
  Grid
} from 'semantic-ui-react';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloProvider as ApolloHooksProvider,
  useQuery,
  useMutation
} from 'react-apollo-hooks';
import gql from 'graphql-tag';

import ListTodos from '../ListTodos/ListTodos';
import AddTodo from '../AddTodo/AddTodo';

import aws_config from '../aws-exports';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

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

export default function ReactApolloHooksTodoWithProvider() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ReactApolloHooksTodo />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

function ReactApolloHooksTodo() {
  const { data, error, loading } = useQuery(gql(queries.listTodos));
  const executeMutation = useMutation(gql(mutations.createTodo));

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  } else if (error) {
    return <Header as="h4">Error: {error.message}</Header>;
  }

  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            {data && data.listTodos && data.listTodos.items && (
              <ListTodos todos={data.listTodos.items} />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <AddTodo addTodo={executeMutation} usesVariables={true} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
