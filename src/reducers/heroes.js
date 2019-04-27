import {
  GET_HEROES_BY_USER_ID_START,
  GET_HEROES_BY_USER_ID_SUCCESS,
  GET_HEROES_BY_USER_ID_ERROR
} from '../actions/heroes';

const initialState = {

};

export default function HeroesReducer(state=initialState, action) {
  switch(action.type) {
  case GET_HEROES_BY_USER_ID_START:
    return Object.assign({}, state, {
      [`${action.payload.userId}`]: {
        loading: true
      }
    });
  case GET_HEROES_BY_USER_ID_SUCCESS:
    return Object.assign({}, state, {
      [`${action.payload.userId}`]: action.payload.heroes
    });
  case GET_HEROES_BY_USER_ID_ERROR:
    return Object.assign({}, state, {
      [`${action.payload.userId}`]: {
        error: true,
        message: action.payload.error
      }
    });
  default:
    return state;
  }
}
