import constants from '../constants';
import {
  loginAuthenticate,
  getUserRequest,
  getUserHeroesRequest,
  getUserInventoryRequest,
  putUserRequest
} from '../rest/tinycrawl';
import { notify } from './notifications';

export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_OK = 'USER_AUTH_OK';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

export const USER_SIGN_OUT = 'USER_SIGN_OUT';

export const GITHUB_OAUTH_CODE_SUCCESS = 'GITHUB_OAUTH_CODE_SUCCESS';
export const GITHUB_OAUTH_ACCESS_TOKEN_SUCCESS = 'GITHUB_OAUTH_ACCESS_TOKEN_SUCCESS';

export const GITHUB_GET_USER_START = 'GITHUB_GET_USER_START';
export const GITHUB_GET_USER_SUCCESS = 'GITHUB_GET_USER_SUCCESS';
export const GITHUB_GET_USER_ERROR = 'GITHUB_GET_USER_ERROR';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const GET_USER_HEROES_START = 'GET_USER_HEROES_START';
export const GET_USER_HEROES_SUCCESS = 'GET_USER_HEROES_SUCCESS';
export const GET_USER_HEROES_ERROR = 'GET_USER_HEROES_ERROR';

export const GET_USER_INVENTORY_START = 'GET_USER_INVENTORY_START';
export const GET_USER_INVENTORY_SUCCESS = 'GET_USER_INVENTORY_SUCCESS';
export const GET_USER_INVENTORY_ERROR = 'GET_USER_INVENTORY_ERROR';

export const PUT_USER_START = 'PUT_USER_START';
export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';
export const PUT_USER_ERROR = 'PUT_USER_ERROR';

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
      .then(data => {
        dispatch(
          userAuthOk(
            username,
            data.token
          )
        );
      })
      .catch(error => {
        dispatch(notify('Login or password invalid.', '', 'error'));
        dispatch(userAuthError(error.message));
      });
  };
}

export function userSignOut() {
  return {
    type: USER_SIGN_OUT
  };
}

function githubOauthCodeSuccess(code) {
  return {
    type: GITHUB_OAUTH_CODE_SUCCESS,
    payload: { code }
  };
}

function githubOauthAccessTokenSuccess(accessToken) {
  return {
    type: GITHUB_OAUTH_ACCESS_TOKEN_SUCCESS,
    payload: { accessToken }
  };
}

export function githubOauth(code) {
  return dispatch => {
    dispatch(githubOauthCodeSuccess(code));
    fetch(
      'https://cors-anywhere.herokuapp.com/' +
      constants.GITHUB_OAUTH_ACCESS_TOKEN_URL +
        '?client_id=' +
        constants.GITHUB_CLIENT_ID +
        '&client_secret=' +
        constants.GITHUB_CLIENT_SECRET +
        '&code=' +
        code,
      {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
      }
    )
      .then(response => response.json())
      .then(data => {
        dispatch(githubOauthAccessTokenSuccess(data.access_token));
        dispatch(githubGetUser(data.access_token));
      });
  };
}

function githubGetUserStart() {
  return {
    type: GITHUB_GET_USER_START
  };
}

function githubGetUserSuccess(data) {
  return {
    type: GITHUB_GET_USER_SUCCESS,
    payload: { data }
  };
}

function githubGetUserError(error) {
  return {
    type: GITHUB_GET_USER_ERROR,
    payload: { error }
  };
}

export function githubGetUser(token) {
  return dispatch => {
    dispatch(githubGetUserStart());
    fetch(constants.GITHUB_API_USER_ENDPOINT, {
      headers: { 'Authorization': `token ${token}` }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(githubGetUserSuccess(data));
      })
      .catch(error => {
        dispatch(githubGetUserError(error));
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
  return dispatch => new Promise((resolve, reject) => {
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
        resolve(data.users);
      })
      .catch(error => {
        dispatch(getUserError(username, error));
        reject();
      });
  });
}

function getUserHeroesStart(username) {
  return {
    type: GET_USER_HEROES_START,
    payload: { username }
  };
}

function getUserHeroesSuccess(username, data) {
  return {
    type: GET_USER_HEROES_SUCCESS,
    payload: {
      username,
      data
    }
  };
}

function getUserHeroesError(username, error) {
  return {
    type: GET_USER_HEROES_ERROR,
    payload: {
      username,
      error
    }
  };
}

export function getUserHeroes(username, uuid) {
  return dispatch => {
    dispatch(getUserHeroesStart(username));
    fetch(getUserHeroesRequest(uuid))
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.status}: ${data.statusText}`);
        }
      })
      .then(data => {
        dispatch(getUserHeroesSuccess(username, data));
      })
      .catch(error => {
        dispatch(getUserHeroesError(username, error));
      });
  };
}

function getUserInventoryStart(username) {
  return {
    type: GET_USER_INVENTORY_START,
    payload: { username }
  };
}

function getUserInventorySuccess(username, data) {
  return {
    type: GET_USER_INVENTORY_SUCCESS,
    payload: { username, data }
  };
}

function getUserInventoryError(username, error) {
  return {
    type: GET_USER_INVENTORY_ERROR,
    payload: { username, error }
  };
}

export function getUserInventory(username) {
  return dispatch => {
    dispatch(getUserInventoryStart(username));
    fetch(getUserInventoryRequest(username))
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`Could not get user inventory: ${data.status}: ${data.statusText}`);
        }
      })
      .then(data => {
        dispatch(getUserInventorySuccess(username, data));
      })
      .catch(error => {
        dispatch(getUserInventoryError(username, error));
      });
  };
}

function putUserStart() {
  return {
    type: PUT_USER_START
  };
}

function putUserSuccess() {
  return {
    type: PUT_USER_SUCCESS
  };
}

function putUserError(error) {
  return {
    type: PUT_USER_ERROR,
    payload: { error }
  };
}

export function putUser(uuid, token, body) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(putUserStart());
    fetch(putUserRequest(uuid, token, body))
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      })
      .then(() => {
        dispatch(putUserSuccess());
        resolve();
      })
      .catch(error => {
        dispatch(putUserError(error));
        reject();
      });
  });
}
