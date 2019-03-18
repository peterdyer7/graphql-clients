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
import { ApolloProvider, Query, Mutation } from 'react-apollo';
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

export default function ApolloTodoWithProvider() {
  return (
    <ApolloProvider client={client}>
      <ApolloTodo />
    </ApolloProvider>
  );
}

function ApolloTodo() {
  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <Query
              query={gql(queries.listTodos)}
              variables={{ limit: 10 }}
              // fetchPolicy={'cache-and-network'}
            >
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  );
                if (error)
                  return <Header as="h4">Error: {error.message}</Header>;
                if (!data || !data.listTodos || !data.listTodos.items)
                  return <Header as="h4">No todos</Header>;
                return <ListTodos todos={data.listTodos.items} />;
              }}
            </Query>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Mutation
              mutation={gql(mutations.createTodo)}
              refetchQueries={[
                { query: gql(queries.listTodos), variables: { limit: 10 } }
              ]}
            >
              {(createTodo) => (
                <AddTodo addTodo={createTodo} usesVariables={true} />
              )}
            </Mutation>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
