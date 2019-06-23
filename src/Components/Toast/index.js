import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Grid,
  Icon,
  Segment
} from 'semantic-ui-react';

import styles from './styles.scss';

const levelToColor = level => {
  switch(level) {
  case 'error':
    return 'red';
  case 'success':
    return 'green';
  case 'info':
  default:
    return 'blue';
  }
};

const levelToIcon = level => {
  switch(level) {
  case 'info':
    return 'info';
  case 'warning':
    return 'warning sign';
  case 'error':
    return 'exclamation';
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
    <Segment
      inverted
      className={
        classnames(
          styles.tc,
          styles.toast,
          {[`${styles.top_left}`]: placement === 'top-left'},
          {[`${styles.top_right}`]: placement === 'top-right'},
          {[`${styles.bottom_left}`]: placement === 'bottom-left'},
          {[`${styles.bottom_right}`]: placement === 'bottom-right'}
        )}
      color={ levelToColor(level) }
      info={level === 'info'}
      warning={level === 'warning'}
      error={level === 'error'}
      success={level === 'success'}
      style={ style }
      onClick={ onClick }
    >
      <Grid className={styles.toast_grid}>
        <Grid.Column
          className={styles.toast_icon}
        >
          <Icon
            size='big'
            name={levelToIcon(level)}
          />
        </Grid.Column>
        <Grid.Column
          className={styles.content_column}
        >
          <Grid.Row className={styles.toast_header}>
            { title }
          </Grid.Row>
          <Grid.Row className={styles.toast_content}>
            { children }
          </Grid.Row>
        </Grid.Column>
        <div className={styles.toast_close}>
          <Icon name='times'/>
        </div>
      </Grid>      
    </Segment>
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
