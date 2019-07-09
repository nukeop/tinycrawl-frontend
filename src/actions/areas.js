import {
  discoverAreaRequest
} from '../rest/tinycrawl';
import { apiResponseHandler } from '../handlers/apiResponseHandler';
import { notify } from './notifications';

export const DISCOVER_AREA_START = 'DISCOVER_AREA_START';
export const DISCOVER_AREA_SUCCESS = 'DISCOVER_AREA_SUCCESS';
export const DISCOVER_AREA_ERROR = 'DISCOVER_AREA_ERROR';

function discoverAreaStart() {
  return {
    type: DISCOVER_AREA_START
  };
}

function discoverAreaSuccess(data) {
  return {
    type: DISCOVER_AREA_SUCCESS,
    payload: { data }
  };
}

function discoverAreaError(error) {
  return {
    type: DISCOVER_AREA_ERROR,
    payload: { error }
  };
}

export function discoverArea(token) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(discoverAreaStart());
    fetch(discoverAreaRequest(token))
      .then(apiResponseHandler)
      .then(data => {
        dispatch(discoverAreaSuccess(data));
        resolve(data);
      })
      .catch(error => {
        dispatch(notify(
          error.message, '', 'error'
        ));
        dispatch(discoverAreaError(error));
        reject(error);
      });
  });
}
