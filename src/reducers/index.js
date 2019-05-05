import { combineReducers } from 'redux';

import DefinitionsReducer from './definitions';
import HeroReducer from './heroes';
import ItemsReducer from './items';
import NotesReducer from './notes';
import NotificationsReducer from './notifications';
import UserReducer from './user';

export default combineReducers({
  definitions: DefinitionsReducer,
  heroes: HeroReducer,
  items: ItemsReducer,
  notes: NotesReducer,
  notifications: NotificationsReducer,
  user: UserReducer
});
