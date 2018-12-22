import { combineReducers } from 'redux';

import Notifications from './notifications';
import User from './user';

export default combineReducers({
  notifications: Notifications,
  user: User
});
