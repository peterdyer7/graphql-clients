import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';

export default function AddTodo({ addTodo, usesVariables = false, refetch }) {
  const [todo, setTodo] = React.useState({ name: '', description: '' });

  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(todo);
    if (usesVariables) {
      addTodo({ variables: { input: todo } });
    } else {
      addTodo({ input: todo });
    }
    if (refetch) {
      refetch();
      console.log('here');
    }
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
