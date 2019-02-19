import {
  generateAuthToken,
  loginAuthenticate
} from '../rest/tinycrawl';
import { notify } from './notifications';

export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_OK = 'USER_AUTH_OK';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

function userAuthStart() {
  return {
    type: USER_AUTH_START
  };
}

function userAuthOk(username, token) {
  return {
    type: USER_AUTH_OK,
    payload: {
      username,
      token
    }
  };
}

function userAuthError(error) {
  return {
    type: USER_AUTH_ERROR,
    payload: {
      error
    }
  };
}

export function userAuth(username, password) {
  return dispatch => {
    dispatch(userAuthStart());
    fetch(loginAuthenticate(username, password))
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.status}: ${data.statusText}`);
        }
      })
      .then(() => {
        dispatch(
          userAuthOk(
            username,
            generateAuthToken(username, password)
          )
        );
      })
      .catch(error => {
        dispatch(notify('Login or password invalid.', 'alert'));
        dispatch(userAuthError(error.message));
      });
  };
}
