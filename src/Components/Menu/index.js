import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Row from '../Row';
import MenuButton from './MenuButton';

import styles from './styles.scss';

const Menu = props => {
  return (
    <Row
      grow={1}
      style={Object.assign({},
        props.style
      )}
      className={classnames(
        styles.tc,
        styles.menu,
        props.className,
        { [`${styles.right_aligned}`]: props.rightAligned  }
      )}
    >
      { props.children }
    </Row>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
  rightAligned: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string
};

Menu.defaultProps = {
  rightAligned: false
};

export default Menu;
export { MenuButton };
