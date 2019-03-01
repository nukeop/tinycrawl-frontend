import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Menu from '../../Components/Menu';

import common from '../../common.scss';
import styles from './styles.scss';

function isLoggedIn(user) {
  return !_.isEmpty(_.get(user, 'credentials.username'));
}

const TopBar = props => {
  const {
    user
  } = props;

  return (
    <Menu rightAligned>
      <NavLink to='/notes' activeClassName={common.active_link}>
        <i className='bx bx-envelope'></i>
      </NavLink>
      {
        !isLoggedIn(user) &&
      <NavLink to='/login' activeClassName={common.active_link}>
        <i className='bx bx-user-circle'></i>
      </NavLink>
      }
      {
        isLoggedIn(user) &&
      <NavLink to='/me' className={styles.username_link} activeClassName={common.active_link}>
        { _.get(user, 'credentials.username')}
      </NavLink>
      }
    </Menu>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}), dispatch)
  };
}

TopBar.propTypes = {
  user: PropTypes.object
};

TopBar.defaultProps = {
  user: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
