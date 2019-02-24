import {
  GET_NOTES_PARTS_START,
  GET_NOTES_PARTS_SUCCESS
} from '../actions/notes';

const initialState = {
  notes: {},
  parts: {}
};

export default function NotesReducer(state=initialState, action) {
  switch(action.type) {
  case GET_NOTES_PARTS_START:
    return Object.assign({}, state, {
      parts: { loading: true }
    });
  case GET_NOTES_PARTS_SUCCESS:
    return Object.assign({}, state, {
      parts: action.payload.parts
    });
  default:
    return state;
  }
}
