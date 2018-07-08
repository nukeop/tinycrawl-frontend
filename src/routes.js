import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import LoginScreen from './Views/LoginScreen';

const routes = () => (
  <Switch>
    <Route exact path='/login' component={LoginScreen} />
  </Switch>
);

export default routes;
