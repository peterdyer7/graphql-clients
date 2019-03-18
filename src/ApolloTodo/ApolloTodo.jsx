import React from 'react';
import {
  Header,
  Container,
  Dimmer,
  Loader,
  Segment,
  Grid
} from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ListTodos from '../ListTodos/ListTodos';
//import AddTodo from '../AddTodo/AddTodo';
import AddTodoOptimistic from '../AddTodoOptimistic/AddTodoOptimistic';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export default function ApolloTodo() {
  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <Query
              query={gql(queries.listTodos)}
              fetchPolicy={'cache-and-network'}
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
              refetchQueries={[{ query: gql(queries.listTodos) }]}
            >
              {(createTodo) => (
                //<AddTodo addTodo={createTodo} usesVariables={true} />
                <AddTodoOptimistic
                  addTodo={createTodo}
                  listTodosQuery={gql(queries.listTodos)}
                />
              )}
            </Mutation>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
