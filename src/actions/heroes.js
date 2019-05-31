import _ from 'lodash';

import {
  createHeroRequest,
  deleteHeroRequest,
  getUserHeroesRequest,
  getHeroRequest
} from '../rest/tinycrawl';

export const CREATE_HERO_START = 'CREATE_HERO_START';
export const CREATE_HERO_SUCCESS = 'CREATE_HERO_SUCCESS';
export const CREATE_HERO_ERROR = 'CREATE_HERO_ERROR';

export const DELETE_HERO_START = 'DELETE_HERO_START';
export const DELETE_HERO_SUCCESS = 'DELETE_HERO_SUCCESS';
export const DELETE_HERO_ERROR = 'DELETE_HERO_ERROR';

export const GET_HERO_START = 'GET_HERO_START';
export const GET_HERO_SUCCESS = 'GET_HERO_SUCCESS';
export const GET_HERO_ERROR = 'GET_HERO_ERROR';

export const GET_HEROES_BY_USER_ID_START = 'GET_HEROES_BY_USER_ID_START';
export const GET_HEROES_BY_USER_ID_SUCCESS = 'GET_HEROES_BY_USER_ID_SUCCESS';
export const GET_HEROES_BY_USER_ID_ERROR = 'GET_HEROES_BY_USER_ID_ERROR';

function getHeroStart() {
  return {
    type: GET_HERO_START
  };
}

function getHeroSuccess(hero) {
  return {
    type: GET_HERO_SUCCESS,
    payload: { hero }
  };
}

function getHeroError(error) {
  return {
    type: GET_HERO_ERROR,
    payload: { error }
  };
}

export function getHero(heroId) {
  return dispatch => {
    dispatch(getHeroStart());
    fetch(getHeroRequest(heroId))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Could not fetch hero: ${_.get(response, 'message')}`
          );
        }
      })
      .then(hero => {
        const heroObj = _.get(hero, 'heroes[0]');
        
        dispatch(
          getHeroSuccess({ [`${_.get(heroObj, 'id')}`]: heroObj})
        );
      })
      .catch(error => {
        dispatch(getHeroError(error));
      });
  };
}

function getHeroesByUserIdStart() {
  return {
    type: GET_HEROES_BY_USER_ID_START
  };
}

function getHeroesByUserIdSuccess(heroes) {
  return {
    type: GET_HEROES_BY_USER_ID_SUCCESS,
    payload: { heroes }
  };
}

function getHeroesByUserIdError(error) {
  return {
    type: GET_HEROES_BY_USER_ID_ERROR,
    payload: { error }
  };
}

export function getHeroesByUserId(userId) {
  return dispatch => {
    dispatch(getHeroesByUserIdStart());
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
        const heroes = _.get(data, 'heroes');
        const transformedData = _.fromPairs(_.map(heroes, hero => {
          return [
            _.get(hero, '_id'),
            hero
          ];
        }));
        dispatch(getHeroesByUserIdSuccess(transformedData));
      })
      .catch(error => {
        dispatch(getHeroesByUserIdError(error));
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

export function createHero(authToken) {
  return dispatch => heroData => new Promise((resolve, reject) => {
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
        resolve(data);
      })
      .catch(error => {
        dispatch(createHeroError(error));
        reject(error);
      });
  });
}

function deleteHeroStart() {
  return {
    type: DELETE_HERO_START
  };
}

function deleteHeroSuccess() {
  return {
    type: DELETE_HERO_SUCCESS
  };
}

function deleteHeroError(error) {
  return {
    type: DELETE_HERO_ERROR,
    payload: { error }
  };
}

export function deleteHero(uuid, authToken) {
  return dispatch => {
    dispatch(deleteHeroStart());
    fetch(deleteHeroRequest(uuid, authToken))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Could not delete hero: ${_.get(response, 'message')}`
          );
        }
      })
      .then(() => {
        dispatch(deleteHeroSuccess());
      })
      .catch(error => {
        dispatch(deleteHeroError(error));
      });
    
  };
}
