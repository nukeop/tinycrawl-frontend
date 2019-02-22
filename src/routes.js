import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import LoginScreen from './Views/LoginScreen';
import NotesView from './Views/NotesView';
import UserProfile from './Views/UserProfile';

const routes = () => (
  <Switch>
    <Route exact path='/notes' component={NotesView} />
    <Route exact path='/login' component={LoginScreen} />
    <Route exact path='/me' component={UserProfile} />
  </Switch>
);

export default routes;
