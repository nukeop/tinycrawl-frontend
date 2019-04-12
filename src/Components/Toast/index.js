import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Icon,
  Message
} from 'semantic-ui-react';

import styles from './styles.scss';

const levelToIcon = level => {
  switch(level) {
  case 'info':
    return 'info';
  case 'warning':
    return 'warning sign';
  case 'error':
    return 'times';
  case 'success':
    return 'checkmark';
  case 'neutral':
  default:
    return 'comment';
  }
};

const Toast = props => {
  let {
    title,
    level,
    placement,
    onClick,
    style,
    children
  } = props;

  return (
    <Message
      className={
        classnames(
          styles.tc,
          styles.toast,
          {[`${styles.top_left}`]: placement === 'top-left'},
          {[`${styles.top_right}`]: placement === 'top-right'},
          {[`${styles.bottom_left}`]: placement === 'bottom-left'},
          {[`${styles.bottom_right}`]: placement === 'bottom-right'}
        )}
      info={level === 'info'}
      warning={level === 'warning'}
      error={level === 'error'}
      success={level === 'success'}
      style={ style }
      onClick={ onClick }
    >
      <div className={styles.toast_icon}>
        <Icon name={ levelToIcon(level) } />
      </div>
      <div className={styles.toast_text}>
        <Message.Header>
          { title }
        </Message.Header>
        { children }
      </div>
      <div className={styles.toast_close}>
        <Icon name='times'/>
      </div>
    </Message>
  );
};

Toast.propTypes = {
  title: PropTypes.string,
  level: PropTypes.oneOf(['neutral', 'info', 'warning', 'error', 'success']),
  placement: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  onClick: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node
};

Toast.defaultProps = {
  title: '',
  level: 'primary',
  placement: 'bottom-right',
  onClick: () => {},
  style: {},
  children: null
};

export default Toast;
