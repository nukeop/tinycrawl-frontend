import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import persist from './localstorage';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      persist(['user'])
    )
  );

  if(module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}
