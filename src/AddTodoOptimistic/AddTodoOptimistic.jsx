import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';

import * as queries from '../graphql/queries';

export default function AddTodoOptimistic({ addTodo, listTodosQuery }) {
  const [todo, setTodo] = React.useState({ name: '', description: '' });

  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(todo);

    addTodo({
      variables: { input: todo },
      optimisticResponse: {
        createTodo: {
          id: Math.round(Math.random() * -1000000),
          name: todo.name,
          description: todo.description,
          __typename: 'Todo'
        }
      },
      update: (cache, { data: { createTodo } }) => {
        const cachedTodos = cache.readQuery({
          query: listTodosQuery
        });
        cachedTodos.listTodos.items.push(createTodo);
        cache.writeQuery({
          query: listTodosQuery,
          data: cachedTodos
        });
      }
    });
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
