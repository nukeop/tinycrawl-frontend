import {
  getDefinitionsRequest
} from '../rest/tinycrawl';

export const GET_DEFINITIONS_START = 'GET_DEFINITIONS_START';
export const GET_DEFINITIONS_SUCCESS = 'GET_DEFINITIONS_SUCCESS';
export const GET_DEFINITIONS_ERROR = 'GET_DEFINITIONS_ERROR';

function getDefinitionsStart() {
  return {
    type: GET_DEFINITIONS_START
  };
}

function getDefinitionsSuccess(definitions) {
  return {
    type: GET_DEFINITIONS_SUCCESS,
    payload: { definitions }
  };
}

function getDefinitionsError(error) {
  return {
    type: GET_DEFINITIONS_ERROR,
    payload: { error }
  };
}

export function getDefinitions() {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(getDefinitionsStart());
    fetch(getDefinitionsRequest())
      .then(response => response.json())
      .then(data => {
        dispatch(getDefinitionsSuccess(data.definitions));
        resolve();
      })
      .catch(error => {
        console.error(error); //eslint-disable-line
        dispatch(getDefinitionsError(error));
        reject();
      });
  });
}
