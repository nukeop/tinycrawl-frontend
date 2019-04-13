import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import HeroesOverview from './Views/HeroesOverview';
import LoginScreen from './Views/LoginScreen';
import NotesView from './Views/NotesView';
import UserProfile from './Views/UserProfile';
import CreateHeroFormView from './Views/CreateHeroFormView';

const routes = () => (
  <Switch>
    <Route exact path='/notes' component={NotesView} />
    <Route exact path='/login' component={LoginScreen} />
    <Route exact path='/heroes' component={HeroesOverview} />
    <Route exact path='/create-hero' component={CreateHeroFormView}/>
    <Route exact path='/me' component={UserProfile} />
  </Switch>
);

export default routes;
