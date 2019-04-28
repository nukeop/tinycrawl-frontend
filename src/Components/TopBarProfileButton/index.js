import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  Icon,
  Image,
  Menu
} from 'semantic-ui-react';

import styles from './styles.scss';

function isLoggedIn(user) {
  return !_.isNil(_.get(user, 'credentials.token'));
}

function isLoggedInViaGithub(user) {
  return !_.isNil(_.get(user, 'credentials.oauth.github.login'));
}

const options = [
  { key: 'me', text: 'Profile', icon: 'user', as: Link, to: '/me' },
  { key: 'signout', text: 'Sign out', icon: 'sign out', as: Link, to: 'sign-out'}
];

const TopBarProfileButton = props => {
  const { user } = props;

  return (
    <Menu.Item className={ styles.topbar_profile_item }>
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
                <span>
                  { _.get(user, 'credentials.username') } 
                </span>
            }

            {
              isLoggedInViaGithub(user) &&
                <React.Fragment>
                  <Image spaced='right' avatar src={ _.get(user, 'credentials.oauth.github.avatar_url') }/>
                  <span>{ _.get(user, 'credentials.oauth.github.login') }</span> 
                </React.Fragment>
              
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
