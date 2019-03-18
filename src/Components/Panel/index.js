import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

const Panel = props => {
  return (
    <div
      className={
        classnames(
          props.className,
          styles.panel,
          { fluid: props.fluid },
          { border: props.border },
          { container: props.container }
        )
      }
      style={props.style}
    >
      {props.children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  border: PropTypes.bool,
  container: PropTypes.bool
};

Panel.defaultProps = {
  children: null,
  style: {},
  className: '',
  fluid: false,
  border: false,
  container: false
};

export default Panel;
