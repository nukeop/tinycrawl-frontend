import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

const Container = props => (
  <div
    className={
      classnames(
        styles.container,
        props.className,
        { narrow: props.narrow }
      )
    }
    style={props.style}
  >
    {props.children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  narrow: PropTypes.bool
};

Container.defaultProps = {
  children: null,
  style: {},
  className: '',
  narrow: false
};

export default Container;
