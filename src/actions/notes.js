import {
  getNotesPartsRequest
} from '../rest/tinycrawl';
import { notify } from './notifications';

export const GET_NOTES_PARTS_START = 'GET_NOTES_PARTS_START';
export const GET_NOTES_PARTS_SUCCESS = 'GET_NOTES_PARTS_SUCCESS';
export const GET_NOTES_PARTS_ERROR = 'GET_NOTES_PARTS_ERROR';

function getNotesPartsStart() {
  return {
    type: GET_NOTES_PARTS_START
  };
}

function getNotesPartsSuccess(parts) {
  return {
    type: GET_NOTES_PARTS_SUCCESS,
    payload: { parts }
  };
}

function getNotesPartsError(error) {
  return {
    type: GET_NOTES_PARTS_ERROR,
    payload: { error }
  };
}

export function getNotesParts() {
  return dispatch => {
    dispatch(getNotesPartsStart());
    fetch(getNotesPartsRequest())
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.status}: ${data.statusText}`);
        }
      })
      .then(parts => {
        dispatch(getNotesPartsSuccess(parts));
      })
      .catch(error => {
        dispatch(notify('Backend connection error.', 'alert'));
        dispatch(getNotesPartsError(error));
      });
  };
}
