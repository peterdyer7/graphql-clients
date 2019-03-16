import React from 'react';
import { Menu } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Urql from './Urql/Urql';

export default function App() {
  return (
    <BrowserRouter>
      <Menu>
        <Menu.Item as={NavLink} to="/amplify">
          Amplify
        </Menu.Item>
        <Menu.Item as={NavLink} to="/urql">
          Urql
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/urql/" component={Urql} />
      </Switch>
    </BrowserRouter>
  );
}
