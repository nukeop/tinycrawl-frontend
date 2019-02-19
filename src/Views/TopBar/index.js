import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Menu, { Menubutton } from '../../Components/Menu';

import common from '../../common.scss';
import styles from './styles.scss';

const TopBar = props => {
  const {
    user
  } = props;

  return (
    <Menu rightAligned>
      <NavLink to='/login' activeClassName={common.active_link}>
        <i className='bx bx-user-circle'></i>
      </NavLink>
      {
        !_.isEmpty(_.get(user, 'credentials.username')) &&
        <NavLink to='/profile' className={styles.username_link} activeClassName={common.active_link}>
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
