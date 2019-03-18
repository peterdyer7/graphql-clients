import React from 'react';
import {
  Container,
  Segment,
  Grid,
  Dimmer,
  Loader,
  Message
} from 'semantic-ui-react';
import { Provider, createClient, useQuery, useMutation } from 'urql';

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

export default function UrqlTodoHooksWithProvider() {
  return (
    <Provider value={client}>
      <UrqlTodoHooks />
    </Provider>
  );
}

function UrqlTodoHooks() {
  const [resQuery] = useQuery({
    query: queries.listTodos,
    variables: { limit: 10 },
    requestPolicy: 'cache-and-network'
  });
  const [resMutation, executeMutation] = useMutation(mutations.createTodo);

  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            {resQuery.fetching && (
              <Dimmer active>
                <Loader />
              </Dimmer>
            )}
            {resQuery.error && (
              <Message negative>Error: {resQuery.error.message}</Message>
            )}
            {resQuery.data &&
              resQuery.data.listTodos &&
              resQuery.data.listTodos.items && (
                <ListTodos todos={resQuery.data.listTodos.items} />
              )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <AddTodo addTodo={executeMutation} />
            {resQuery.error && (
              <Message negative>Error: {resMutation.error.message}</Message>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
