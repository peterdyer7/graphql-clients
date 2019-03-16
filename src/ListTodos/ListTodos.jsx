import React from 'react';
import { Header, List } from 'semantic-ui-react';

export default function ListTodos({ todos }) {
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
