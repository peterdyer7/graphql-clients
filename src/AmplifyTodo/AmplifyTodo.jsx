import React from 'react';
import {
  Header,
  Container,
  Dimmer,
  Loader,
  Segment,
  Grid
} from 'semantic-ui-react';
import Amplify, { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';

import ListTodos from '../ListTodos/ListTodos';
import AddTodo from '../AddTodo/AddTodo';

import aws_config from '../aws-exports';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

Amplify.configure(aws_config);

export default function AmplifyTodo() {
  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <Connect query={graphqlOperation(queries.listTodos)}>
              {({ data, loading, error }) => {
                if (error)
                  return <Header as="h4">Error: {error.message}</Header>;
                if (loading)
                  return (
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  );
                if (!data || !data.listTodos || !data.listTodos.items)
                  return <Header as="h4">No todos</Header>;
                return <ListTodos todos={data.listTodos.items} />;
              }}
            </Connect>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Connect mutation={graphqlOperation(mutations.createTodo)}>
              {({ mutation }) => <AddTodo addTodo={mutation} />}
            </Connect>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
