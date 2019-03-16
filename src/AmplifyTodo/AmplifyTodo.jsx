import React from 'react';
import {
  Header,
  List,
  Form,
  Container,
  Button,
  Dimmer,
  Loader,
  Segment,
  Grid
} from 'semantic-ui-react';
import Amplify, { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';

import aws_config from '../aws-exports';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

Amplify.configure(aws_config);

function ListTodos({ todos }) {
  return (
    <>
      <Header as="h2">Todos</Header>
      <List>
        {todos.map((todo) => (
          <List.Item key={todo.id}>
            <List.Header>{todo.name}</List.Header>
            {todo.description}
          </List.Item>
        ))}
      </List>
    </>
  );
}

function AddTodo({ addTodo }) {
  const [todo, setTodo] = React.useState({ name: '', description: '' });

  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(todo);
    addTodo({ input: todo });
  }

  return (
    <>
      <Header as="h3">Add Todo</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input name="name" placeholder="Name" onChange={handleChange} />
        <Form.TextArea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <Button type="Submit">Add</Button>
      </Form>
    </>
  );
}

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
