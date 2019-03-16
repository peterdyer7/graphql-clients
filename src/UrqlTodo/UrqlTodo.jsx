import React from 'react';
import {
  Container,
  Segment,
  Grid,
  Dimmer,
  Loader,
  Header
} from 'semantic-ui-react';
import { Provider, createClient, Query, Mutation } from 'urql';
import gql from 'graphql-tag';

import ListTodos from '../ListTodos/ListTodos';

import aws_config from '../aws-exports';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import AddTodo from '../AddTodo/AddTodo';

const client = createClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': aws_config.aws_appsync_apiKey
    }
  }
});

export default function UrqlTodoWithProvider() {
  return (
    <Provider value={client}>
      <UrqlTodo />
    </Provider>
  );
}

function UrqlTodo() {
  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <Query
              query={gql(queries.listTodos)}
              variables={{ limit: 10 }}
              requestPolicy="cache-and-network"
            >
              {({ fetching, data, error }) => {
                if (error)
                  return <Header as="h4">Error: {error.message}</Header>;
                if (fetching)
                  return (
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  );
                if (!data || !data.listTodos || !data.listTodos.items)
                  return <Header as="h4">No todos</Header>;
                return <ListTodos todos={data.listTodos.items} />;
              }}
            </Query>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Mutation query={gql(mutations.createTodo)}>
              {({ executeMutation }) => <AddTodo addTodo={executeMutation} />}
            </Mutation>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
