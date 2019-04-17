import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import {
  Dropdown,
  Icon,
  Menu
} from 'semantic-ui-react';

import GithubUserProfileButton from '../GithubUserProfileButton';

import styles from './styles.scss';

function isLoggedIn(user) {
  return !_.isNil(_.get(user, 'credentials.token'));
}

function isLoggedInViaGithub(user) {
  return !_.isNil(_.get(user, 'credentials.oauth.github.login'));
}

const options = [
  { key: 'me', text: 'Profile', icon: 'user', as: NavLink, to: '/me' },
  { key: 'logout', text: 'Sign out', icon: 'sign out' }
];

const TopBarProfileButton = props => {
  const { user } = props;

  return (
    <Menu.Item>
      <Dropdown
        className={ styles.topbar_profile_button }
        direction='right'
        pointing='top right'
        options={ options }
        inverted
        trigger={
          <React.Fragment>
            {
              isLoggedIn(user) &&
          _.get(user, 'credentials.username') 
            }

            {
              isLoggedInViaGithub(user) &&
            <GithubUserProfileButton
              login={ _.get(user, 'credentials.oauth.github.login') }
              avatar={ _.get(user, 'credentials.oauth.github.avatar_url') }
            />
            }
      
            <Icon name='chevron down'/>
          </React.Fragment>
        }
      >
        
      </Dropdown>
    </Menu.Item>
  );
};

TopBarProfileButton.propTypes = {
  user: PropTypes.shape({
    credentials: PropTypes.shape({
      oauth: PropTypes.shape({
        github: PropTypes.shape({
          login: PropTypes.string,
          avatar_url: PropTypes.string
        })
      }),
      username: PropTypes.string
    })
  })
};

TopBarProfileButton.defaultProps = {

};

export default TopBarProfileButton;
