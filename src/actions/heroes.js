import _ from 'lodash';

import { createHeroRequest } from '../rest/tinycrawl';

export const CREATE_HERO_START = 'CREATE_HERO_START';
export const CREATE_HERO_SUCCESS = 'CREATE_HERO_SUCCESS';
export const CREATE_HERO_ERROR = 'CREATE_HERO_ERROR';

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
