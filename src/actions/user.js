import constants from '../constants';
import {
  loginAuthenticate,
  getUserRequest,
  getUserHeroesRequest
} from '../rest/tinycrawl';
import { notify } from './notifications';

export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_OK = 'USER_AUTH_OK';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';

export const GITHUB_OAUTH_CODE_SUCCESS = 'GITHUB_OAUTH_CODE_SUCCESS';
export const GITHUB_OAUTH_ACCESS_TOKEN_SUCCESS = 'GITHUB_OAUTH_ACCESS_TOKEN_SUCCESS';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const GET_USER_HEROES_START = 'GET_USER_HEROES_START';
export const GET_USER_HEROES_SUCCESS = 'GET_USER_HEROES_SUCCESS';
export const GET_USER_HEROES_ERROR = 'GET_USER_HEROES_ERROR';

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
        dispatch(notify('Login or password invalid.', 'alert'));
        dispatch(userAuthError(error.message));
      });
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
