import {
  USER_AUTH_ERROR
} from '../actions/user';

const initialState = {

};

export default function NotificationsReducer(state=initialState, action) {
  switch(action.type) {
  case USER_AUTH_ERROR:
    return Object.assign({}, state, {
      error: action.payload.error
    });
  default:
    return state;
  }
}
