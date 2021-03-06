import _ from 'lodash';

import {
  USER_AUTH_START,
  USER_AUTH_OK,
  USER_AUTH_ERROR,

  USER_SIGN_OUT,

  GITHUB_OAUTH_CODE_SUCCESS,
  GITHUB_OAUTH_ACCESS_TOKEN_SUCCESS,

  GITHUB_GET_USER_START,
  GITHUB_GET_USER_SUCCESS,
  GITHUB_GET_USER_ERROR,

  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_ERROR,

  GET_USER_HEROES_START,
  GET_USER_HEROES_SUCCESS,
  GET_USER_HEROES_ERROR,

  GET_USER_INVENTORY_START,
  GET_USER_INVENTORY_SUCCESS,
  GET_USER_INVENTORY_ERROR,

  GET_USER_AREAS_START,
  GET_USER_AREAS_SUCCESS,
  GET_USER_AREAS_ERROR
} from '../actions/user';

const initialState = {
  credentials: null
};

export default function UserReducer(state=initialState, action) {
  switch(action.type) {
  case USER_AUTH_START:
    return Object.assign({}, state, {
      credentials: {
        loading: true
      }
    });
  case USER_AUTH_OK:
    return Object.assign({}, state, {
      credentials: action.payload
    });
  case USER_AUTH_ERROR:
    return Object.assign({}, state, {
      credentials: null
    });
  case GITHUB_OAUTH_CODE_SUCCESS:
    return Object.assign({}, state, {
      credentials: {
        ...state.credentials,
        githubOauthCode: action.payload.code
      }
    });
  case GITHUB_OAUTH_ACCESS_TOKEN_SUCCESS:
    return Object.assign({}, state, {
      credentials: {
        ...state.credentials,
        githubAccessToken: action.payload.accessToken
      }
    });
  case GITHUB_GET_USER_START:
    return Object.assign({}, state, {
      credentials: {
        ...state.credentials,
        oauth: {
          ..._.get(state, 'credentials.oauth'),
          github: { loading: true }
        }
      }
    });
  case GITHUB_GET_USER_SUCCESS:
    return Object.assign({}, state, {
      credentials: {
        ...state.credentials,
        oauth: {
          ..._.get(state, 'credentials.oauth'),
          github: { ...action.payload.data }
        }
      }
    });
  case GITHUB_GET_USER_ERROR:
    return Object.assign({}, state, {
      credentials: {
        ...state.credentials,
        oauth: {
          ..._.get(state, 'credentials.oauth'),
          github: { error: true }
        }
      }
    });
  case GET_USER_START:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: {
          loading: true
        }
      })
    });
  case GET_USER_SUCCESS:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: action.payload.data
      })
    });
  case GET_USER_ERROR:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: { error: true }
      })
    });
  case GET_USER_HEROES_START:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: Object.assign({}, _.get(state, `users.${action.payload.username}`), {
          heroes: { loading: true }
        })
      })
    });
  case GET_USER_HEROES_SUCCESS:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: Object.assign({}, _.get(state, `users.${action.payload.username}`), {
          heroes: action.payload.data.heroes
        })
      })
    });
  case GET_USER_HEROES_ERROR:
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        [`${action.payload.username}`]: Object.assign({}, _.get(state, `users.${action.payload.username}`), {
          heroes: { error: true }
        })
      })
    });
  case GET_USER_INVENTORY_START:
    return Object.assign({}, state, {
      inventories: Object.assign({}, state.users, {
        [`${action.payload.username}`]: Object.assign({},  {
          loading: true 
        })
      })
    });
  case GET_USER_INVENTORY_SUCCESS:
    return Object.assign({}, state, {
      inventories: Object.assign({}, state.users, {
        [`${action.payload.username}`]: Object.assign({}, {
          ...action.payload.data.inventory
        })
      })
    });
  case GET_USER_INVENTORY_ERROR:
    return Object.assign({}, state, {
      inventories: Object.assign({}, state.inventories, {
        [`${action.payload.username}`]: Object.assign({},  {
          error: true,
          message: action.payload.error
        })
      })
    });
  case GET_USER_AREAS_START:
    return {
      ...state,
      users: {
        ...state.users,
        [`${action.payload.username}`]: {
          ..._.get(state.users, action.payload.username),
          areas: { loading: true }
        }
      }
    };
  case GET_USER_AREAS_SUCCESS:
    return {
      ...state,
      users: {
        ...state.users,
        [`${action.payload.username}`]: {
          ..._.get(state.users, action.payload.username),
          ...action.payload.data
        }
      }
    };
  case GET_USER_AREAS_ERROR:
    return {
      ...state,
      users: {
        ...state.users,
        [`${action.payload.username}`]: {
          ..._.get(state.users, action.payload.username),
          areas: { error: true }
        }
      }
    };  
  case USER_SIGN_OUT:
    return {};
  default:
    return state;
  }
}
