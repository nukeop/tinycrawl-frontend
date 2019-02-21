import {
  USER_AUTH_START,
  USER_AUTH_OK,
  USER_AUTH_ERROR,

  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_ERROR
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
  case GET_USER_START:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: {
          loading: true
        }
      })
    });
  case GET_USER_SUCCESS:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: action.payload.data
      })
    });
  case GET_USER_ERROR:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: null
      })
    });
  default:
    return state;
  }
}
