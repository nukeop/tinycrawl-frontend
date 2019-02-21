import {
  generateAuthToken,
  loginAuthenticate,
  getUserRequest
} from '../rest/tinycrawl';
import { notify } from './notifications';

export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_OK = 'USER_AUTH_OK';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

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

function getUserStart(username) {
  return {
    type: GET_USER_START,
    payload: { username }
  };
}

function getUserSuccess(username, data) {
  return {
    type: GET_USER_SUCCESS,
    payload: {
      username,
      data
    }
  };
}

function getUserError(username, error) {
  return {
    type: GET_USER_ERROR,
    payload: {
      username,
      error
    }
  };
}

export function getUser(username, token) {
  return dispatch => {
    dispatch(getUserStart(username));
    fetch(getUserRequest(username, token))
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.status}: ${data.statusText}`);
        }
      })
      .then(data => {
        dispatch(getUserSuccess(username, data.users));
      })
      .catch(error => {
        dispatch(getUserError(username, error));
      });
  };
}
