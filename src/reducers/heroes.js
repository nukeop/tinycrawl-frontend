import {
  GET_HEROES_BY_USER_ID_START,
  GET_HEROES_BY_USER_ID_SUCCESS,
  GET_HEROES_BY_USER_ID_ERROR,

  GET_HERO_START,
  GET_HERO_SUCCESS,
  GET_HERO_ERROR
} from '../actions/heroes';

const initialState = {

};

export default function HeroesReducer(state=initialState, action) {
  switch(action.type) {
  case GET_HEROES_BY_USER_ID_START:
  case GET_HERO_START:
    return Object.assign({}, state, { loading: true });
  case GET_HEROES_BY_USER_ID_SUCCESS:
    return Object.assign({}, state, {
      ...action.payload.heroes,
      loading: false
    });
  case GET_HEROES_BY_USER_ID_ERROR:
  case GET_HERO_ERROR:
    return Object.assign({}, state, {
      error: true,
      loading: false,
      message: action.payload.error
    });
  case GET_HERO_SUCCESS:
    return Object.assign({}, state, action.payload.hero);
  default:
    return state;
  }
}
