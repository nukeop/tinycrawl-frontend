import React from 'react';
import PropTypes from 'prop-types';

import Row from '../../Row';

import styles from './styles.scss';

const MenuButton = props => {
  return (
    <Row
      className={styles.menu_button}
    >
      { props.children }
    </Row>
  );
};

MenuButton.propTypes = {
  children: PropTypes.node
};

MenuButton.defaultProps = {
  children: null
};

export default MenuButton;
