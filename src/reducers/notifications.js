import _ from 'lodash';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../actions/notifications';

const initialState = {
  notifications: []
};

export default function NotificationsReducer(state=initialState, action) {
  switch(action.type) {
  case ADD_NOTIFICATION:
    return Object.assign({}, state, {
      notifications: _.concat(state.notifications, action.payload)
    });
  case REMOVE_NOTIFICATION:
    return Object.assign({}, state, {
      notifications: _.filter(state.notifications,  n => n.id !== action.payload)
    });
  default:
    return state;
  }
}
