import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Image, Label } from 'semantic-ui-react';

import styles from './styles.scss';

const GithubUserProfileButton = props => {
  return (      
    <Label color='violet' className={ styles.github_user_profile_button }>
      <Image spaced='right' avatar src={ props.avatar }/>
      { props.login }
      <Label.Detail>via <Icon name='github'/>Github</Label.Detail>
    </Label>
  );
};

GithubUserProfileButton.propTypes = {
  login: PropTypes.string,
  avatar: PropTypes.string
};

GithubUserProfileButton.defaultProps = {
  login: '',
  avatar: ''
};

export default GithubUserProfileButton;
