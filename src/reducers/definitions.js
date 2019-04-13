import {
  GET_DEFINITIONS_START,
  GET_DEFINITIONS_SUCCESS,
  GET_DEFINITIONS_ERROR
} from '../actions/definitions';

const initialState = {};

export default function DefinitionsReducer(state=initialState, action) {
  switch(action.type) {
  case GET_DEFINITIONS_START:
    return Object.assign({}, { loading: true });
  case GET_DEFINITIONS_SUCCESS:
    return { ...action.payload.definitions };
  case GET_DEFINITIONS_ERROR:
    return Object.assign({}, { error: true });
  default:
    return state;
  }
}
