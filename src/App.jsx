import React from 'react';
import { Menu } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import AmplifyTodo from './AmplifyTodo/AmplifyTodo';
import AppSyncTodo from './AppSyncTodo/AppSyncTodo';
import ApolloTodo from './ApolloTodo/ApolloTodo';
import ReactApolloHooksTodo from './ReactApolloHooksTodo/ReactApolloHooksTodo';
import UrqlTodo from './UrqlTodo/UrqlTodo';
import UrqlTodoHooks from './UrqlTodoHooks/UrqlTodoHooks';
import GraphqlHooksTodo from './GraphqlHooksTodo/GraphqlHooksTodo';

export default function App() {
  return (
    <BrowserRouter>
      <Menu>
        <Menu.Item as={NavLink} to="/amplify">
          Amplify
        </Menu.Item>
        <Menu.Item as={NavLink} to="/appsync">
          AppSync
        </Menu.Item>
        <Menu.Item as={NavLink} to="/apollo">
          Apollo
        </Menu.Item>
        <Menu.Item as={NavLink} to="/reactapollohooks">
          React Apollo Hooks
        </Menu.Item>
        <Menu.Item as={NavLink} to="/urql">
          Urql
        </Menu.Item>{' '}
        <Menu.Item as={NavLink} to="/urqlhooks">
          Urql Hooks
        </Menu.Item>
        <Menu.Item as={NavLink} to="/graphqlhooks">
          GraphqlHooks
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/amplify/" component={AmplifyTodo} />
        <Route path="/appsync/" component={AppSyncTodo} />
        <Route path="/apollo/" component={ApolloTodo} />
        <Route path="/reactapollohooks/" component={ReactApolloHooksTodo} />
        <Route path="/urql/" component={UrqlTodo} />
        <Route path="/urqlhooks/" component={UrqlTodoHooks} />
        <Route path="/graphqlhooks/" component={GraphqlHooksTodo} />
      </Switch>
    </BrowserRouter>
  );
}
