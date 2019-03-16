import React from 'react';
import { Menu } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import AmplifyTodo from './AmplifyTodo/AmplifyTodo';
import UrqlTodo from './UrqlTodo/UrqlTodo';
import UrqlTodoHooks from './UrqlTodoHooks/UrqlTodoHooks';

export default function App() {
  return (
    <BrowserRouter>
      <Menu>
        <Menu.Item as={NavLink} to="/amplify">
          Amplify
        </Menu.Item>
        <Menu.Item as={NavLink} to="/urql">
          Urql
        </Menu.Item>{' '}
        <Menu.Item as={NavLink} to="/urqlhooks">
          Urql Hooks
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/amplify/" component={AmplifyTodo} />
        <Route path="/urql/" component={UrqlTodo} />{' '}
        <Route path="/urqlhooks/" component={UrqlTodoHooks} />
      </Switch>
    </BrowserRouter>
  );
}
