import { combineReducers } from 'redux';

import DefinitionsReducer from './definitions';
import NotesReducer from './notes';
import NotificationsReducer from './notifications';
import UserReducer from './user';

export default combineReducers({
  definitions: DefinitionsReducer,
  notes: NotesReducer,
  notifications: NotificationsReducer,
  user: UserReducer
});
