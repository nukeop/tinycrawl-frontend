import {

} from '../actions/notes';

const initialState = {
  notes: {},
  structures: [],
  conjunctions: [],
  phrases: []
};

export default function NotesReducer(state=initialState, action) {
  switch(action.type) {
  default:
    return state;
  }
}
