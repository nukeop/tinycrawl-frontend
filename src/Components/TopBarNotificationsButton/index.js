import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Icon,
  Label,
  Menu
} from 'semantic-ui-react';

import styles from './styles.scss';

const TopBarNotificationsButton = props => {
  const {
    notificationsNum,
    onClick
  } = props;
  
  return (
    <Menu.Item className={ styles.topbar_notifications_button } as={ Link } to='#' onClick={ onClick }>
      <Icon name='bell'>
        {
          notificationsNum > 0 &&
          <Label floating circular color='violet'>
            {
              notificationsNum <= 9
                ? notificationsNum
                : '9+'
            }
          </Label>
        }
      </Icon>
      
    </Menu.Item>
  );
};

TopBarNotificationsButton.propTypes = {
  notificationsNum: PropTypes.length,
  onClick: PropTypes.func
};

TopBarNotificationsButton.defaultProps = {
  notificationsNum: 0,
  onClick: () => {}
};

export default TopBarNotificationsButton;
