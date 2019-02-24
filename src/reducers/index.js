import { combineReducers } from 'redux';

import Notes from './notes';
import Notifications from './notifications';
import User from './user';

export default combineReducers({
  notes: Notes,
  notifications: Notifications,
  user: User
});
