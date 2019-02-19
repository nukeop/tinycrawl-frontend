import {
  USER_AUTH_START,
  USER_AUTH_OK,
  USER_AUTH_ERROR
} from '../actions/user';

const initialState = {
  credentials: null
};

export default function UserReducer(state=initialState, action) {
  switch(action.type) {
  case USER_AUTH_START:
    return Object.assign({}, state, {
      credentials: {
        loading: true
      }
    });
  case USER_AUTH_OK:
    return Object.assign({}, state, {
      credentials: action.payload
    });
  case USER_AUTH_ERROR:
    return Object.assign({}, state, {
      credentials: null
    });
  default:
    return state;
  }
}
