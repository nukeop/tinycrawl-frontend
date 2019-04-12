import uuidv4 from 'uuid/v4';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    payload: notification
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: id
  };
}

export function notify(title, content, level, timeout=3) {
  return dispatch => {
    let id = uuidv4();
    dispatch(addNotification(Object.assign({}, {
      onClick: () => {
        dispatch(removeNotification(id));
      },
      id, title, content, level
    })));

    setTimeout(() => dispatch(removeNotification(id)), timeout * 1000);
  };
}
