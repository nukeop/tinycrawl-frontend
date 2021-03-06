import {
  getItemRequest,
  useItemRequest
} from '../rest/tinycrawl';

export const GET_ITEM_START = 'GET_ITEM_START';
export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export const GET_ITEM_ERROR = 'GET_ITEM_ERROR';

export const USE_ITEM_START = 'USE_ITEM_START';
export const USE_ITEM_SUCCESS = 'USE_ITEM_SUCCESS';
export const USE_ITEM_ERROR = 'USE_ITEM_ERROR';

function getItemStart(itemId) {
  return {
    type: GET_ITEM_START,
    payload: { itemId }
  };
}

function getItemSuccess(itemId, item) {
  return {
    type: GET_ITEM_SUCCESS,
    payload: { itemId, item }
  };
}

function getItemError(itemId, error) {
  return {
    type: GET_ITEM_ERROR,
    payload: { itemId, error }
  };
}

export function getItem(itemId) {
  return dispatch => {
    dispatch(getItemStart(itemId));
    fetch(getItemRequest(itemId))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Could not fetch item: ${_.get(response, 'message')}`
          );
        }
      })
      .then(data => {
        dispatch(getItemSuccess(itemId, data.items));
      })
      .catch(error => {
        dispatch(getItemError(itemId, error));
      });
  };
}

function useItemStart(itemId) {
  return {
    type: USE_ITEM_START,
    payload: { itemId }
  };
}

function useItemSuccess(itemId) {
  return {
    type: USE_ITEM_SUCCESS,
    payload: { itemId }
  };
}

function useItemError(itemId, error) {
  return {
    type: USE_ITEM_ERROR,
    payload: { itemId, error }
  };
}

export function useItem(itemId, token) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(useItemStart(itemId));
    fetch(useItemRequest(itemId, token))
      .then(data => {
        if (!data.ok) {
          throw new Error(`${data.status}: ${data.statusText}`);
        }
      })
      .then(() => {
        dispatch(useItemSuccess(itemId));
        resolve();
      })
      .catch(error => {
        dispatch(useItemError(itemId, error.toString()));
        reject();
      });
  });
} 
