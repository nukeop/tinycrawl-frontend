import {
  GET_ITEM_START,
  GET_ITEM_SUCCESS,
  GET_ITEM_ERROR
} from '../actions/items';

const initialState = { };

export default function ItemsReducer(state=initialState, action) {
  switch(action.type) {
  case GET_ITEM_START:
    return Object.assign({}, state, {
      [`${action.payload.itemId}`]: {
        loading: true
      }
    });
  case GET_ITEM_SUCCESS:
    return Object.assign({}, state, {
      [`${action.payload.itemId}`]: action.payload.item
    });
  case GET_ITEM_ERROR:
    return Object.assign({}, state, {
      [`${action.payload.itemId}`]: {
        error: true,
        message: action.payload.error
      }
    });
  default:
    return state;
  }
}
