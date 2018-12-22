import { loginAuthenticate } from '../rest/tinycrawl';

export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_OK = 'USER_AUTH_OK';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

function userAuthStart() {
  return {
    type: USER_AUTH_START
  };
}

function userAuthOk(username) {
  return {
    type: USER_AUTH_OK,
    payload: {
      username
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
      .then(data => {
        console.log(data);
        userAuthOk(username);
      })
      .catch(error => {
        dispatch(userAuthError(error.message));
      });
  };
}
