import _ from 'lodash';

export default function persist(paths, config) {
  const cfg = Object.assign({
    key: 'redux',
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }, config);
  
  const {
    key,
    serialize,
    deserialize
  } = cfg;
  
  return next => (reducer, initialState, enhancer) => {
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
      enhancer = initialState;
      initialState = undefined;
    }
    
    let persistedState, finalInitialState;

    try {
      persistedState = deserialize(localStorage.getItem(key));
      finalInitialState = Object.assign({}, initialState, persistedState);
    } catch (e) {
      console.warn('Failed to retrieve initialize state from localStorage:', e); //eslint-disable-line
    }
    
    const store = next(reducer, finalInitialState, enhancer);
    store.subscribe(() => {
      const state = store.getState();
      const subset = _.pick(state, paths);
      
      try {
        localStorage.setItem(key, serialize(subset));
      } catch (e) {
        console.warn('Unable to persist state to localStorage:', e); //eslint-disable-line
      }
    });

    return store;
  };
}
