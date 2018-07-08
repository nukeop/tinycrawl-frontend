import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

const Column = props => (
  <div
    className={
      classnames(
        styles.column,
        props.className
      )
    }
    style={Object.assign({}, props.style, {
      flexGrow: props.grow || 0,
      flexShrink: props.shrink || 0
    })}
  >
    {props.children}
  </div>
);

Column.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  grow: PropTypes.number,
  shrink: PropTypes.number
};

Column.defaultProps = {
  children: null,
  style: {},
  className: '',
  grow: 0,
  shrink: 0
};

export default Column;
