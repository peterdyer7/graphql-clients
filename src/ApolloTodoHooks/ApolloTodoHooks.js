import React from 'react';
import {
  Container,
  Dimmer,
  Loader,
  Segment,
  Grid,
  Message
} from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ListTodos from '../ListTodos/ListTodos';
//import AddTodo from '../AddTodo/AddTodo';
import AddTodoOptimistic from '../AddTodoOptimistic/AddTodoOptimistic';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export default function ApolloTodo() {
  const { loading, error, data } = useQuery(gql(queries.listTodos));
  // what about refetchqueries
  const [createTodo] = useMutation(gql(mutations.createTodo));

  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            {loading && (
              <Dimmer active>
                <Loader />
              </Dimmer>
            )}
            {error && <Message negative>Error: {error.message}</Message>}
            {data && data.listTodos && data.listTodos.items && (
              <ListTodos todos={data.listTodos.items} />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            {/* <AddTodo addTodo={createTodo} usesVariables={true} /> */}
            <AddTodoOptimistic
              addTodo={createTodo}
              listTodosQuery={gql(queries.listTodos)}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
