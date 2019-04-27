import _ from 'lodash';

import {
  createHeroRequest,
  getUserHeroesRequest
} from '../rest/tinycrawl';

export const CREATE_HERO_START = 'CREATE_HERO_START';
export const CREATE_HERO_SUCCESS = 'CREATE_HERO_SUCCESS';
export const CREATE_HERO_ERROR = 'CREATE_HERO_ERROR';

export const GET_HEROES_BY_USER_ID_START = 'GET_HEROES_BY_USER_ID_START';
export const GET_HEROES_BY_USER_ID_SUCCESS = 'GET_HEROES_BY_USER_ID_SUCCESS';
export const GET_HEROES_BY_USER_ID_ERROR = 'GET_HEROES_BY_USER_ID_ERROR';

function getHeroesByUserIdStart(userId) {
  return {
    type: GET_HEROES_BY_USER_ID_START,
    payload: { userId }
  };
}

function getHeroesByUserIdSuccess(heroes, userId) {
  return {
    type: GET_HEROES_BY_USER_ID_SUCCESS,
    payload: { heroes, userId }
  };
}

function getHeroesByUserIdError(error, userId) {
  return {
    type: GET_HEROES_BY_USER_ID_ERROR,
    payload: { error, userId }
  };
}

export function getHeroesByUserId(userId) {
  return dispatch => {
    dispatch(getHeroesByUserIdStart(userId));
    fetch(getUserHeroesRequest(userId))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Could not fetch heroes: ${_.get(response, 'message')}`
          );
        }
      })
      .then(data => {
        dispatch(getHeroesByUserIdSuccess(data, userId));
      })
      .catch(error => {
        dispatch(getHeroesByUserIdError(error, userId));
      });
  };
}

function createHeroStart() {
  return {
    type: CREATE_HERO_START
  };
}

function createHeroSuccess(hero) {
  return {
    type: CREATE_HERO_SUCCESS,
    payload: { hero }
  };
}

function createHeroError(error) {
  return {
    type: CREATE_HERO_ERROR,
    payload: { error }
  };
}

export function createHero(heroData, authToken) {
  return dispatch => {
    dispatch(createHeroStart());
    fetch(createHeroRequest(heroData, authToken))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Could not create a new hero: ${_.get(response, 'message')}`
          );
        }
      })
      .then(data => {
        dispatch(createHeroSuccess(data));
      })
      .catch(error => {
        dispatch(createHeroError(error));
      });
  };
}
