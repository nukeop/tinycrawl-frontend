import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Frame } from 'arwes';

import styles from './styles.scss';

const layerToIcon = layer => {
  switch(layer) {
  case 'secondary':
    return <i className='bx bx-message-detail'></i>;
  case 'alert':
    return <i className='bx bx-error-circle'></i>;
  case 'success':
    return <i className='bx bx-check-circle'></i>;
  case 'control':
  case 'header':
  case 'primary':
  default:
    return <i className='bx bx-info-circle'></i>;
  }
};

const Toast = props => {
  let {
    level,
    placement,
    children
  } = props;
  
  return (
    <Frame
      animate
      corners={2}
      layer={level}
      className={
        classnames(
          styles.tc,
          styles.toast,
          {[`${styles.top_left}`]: placement === 'top-left'},
          {[`${styles.top_right}`]: placement === 'top-right'},
          {[`${styles.bottom_left}`]: placement === 'bottom-left'},
          {[`${styles.bottom_right}`]: placement === 'bottom-right'},
          {[`${styles.orange}`]: level === 'secondary'},
          {[`${styles.red}`]: level === 'alert'},
          {[`${styles.green}`]: level === 'success'}
        )}
      classes={{
        box: classnames(styles.tc, styles.toast_box),
        children: classnames(styles.tc, styles.toast_box_children)
      }} 
    >
      <div className={classnames(styles.tc, styles.toast_icon)}>
        { layerToIcon(level) }
      </div>
      <div className={classnames(styles.tc, styles.toast_message)}>
        { children }
      </div>
    </Frame>
  );
};

Toast.propTypes = {
  level: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'alert', 'success']),
  placement: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  children: PropTypes.node
};

Toast.defaultProps = {
  level: 'primary',
  placement: 'bottom-right',
  children: null
};

export default Toast;
