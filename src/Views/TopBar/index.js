import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Header, Icon, Menu } from 'semantic-ui-react';

import mockNotifications from '../../mocks/notifications';
import NotificationsPopup from '../../Components/NotificationsPopup';
import TopBarProfileButton from '../../Components/TopBarProfileButton';

import styles from './styles.scss';

function isLoggedIn(user) {
  return !_.isNil(_.get(user, 'credentials.token'));
}

function isLoggedInViaGithub(user) {
  return !_.isNil(_.get(user, 'credentials.oauth.github.login'));
}

const TopBar = props => {
  const {
    user
  } = props;

  return(
    <Menu
      borderless
      compact
      inverted
      fluid
      size='large'
      className={ styles.top_bar }
    >
      <Menu.Item className={styles.brand_name}>
        <Header inverted as='h2'>
          <Icon name='rocket'/>
          Tinycrawl
        </Header>
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item as={NavLink} to='/notes' activeClassName='active'>
          <Icon name='envelope' /> Notes
        </Menu.Item>
        <Menu.Item as={NavLink} to='/heroes' activeClassName='active'>
          <Icon name='space shuttle' /> Heroes
        </Menu.Item>
        {
          !isLoggedIn(user) &&
          !isLoggedInViaGithub(user) &&
            <Menu.Item as={NavLink} to='/login' activeClassName='active'>
              <Icon name='user' /> Log in
            </Menu.Item>
        }
        <NotificationsPopup
          notificationEvents={ mockNotifications }
        />
        <TopBarProfileButton
          user={ user }
        />
      </Menu.Menu>
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
