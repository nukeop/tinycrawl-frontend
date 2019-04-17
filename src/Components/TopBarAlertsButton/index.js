import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Icon,
  Label,
  Menu
} from 'semantic-ui-react';

import styles from './styles.scss';

const TopBarAlertsButton = props => {
  const {
    alertsNum
  } = props;
  
  return (
    <Menu.Item className={ styles.topbar_alerts_button } as={ NavLink } to='alerts'>
      <Icon name='bell'>
        {
          alertsNum > 0 &&
          <Label floating circular color='red'>
            { alertsNum }
          </Label>
        }
      </Icon>
      
    </Menu.Item>
  );
};

TopBarAlertsButton.propTypes = {
  alertsNum: PropTypes.length
};

TopBarAlertsButton.defaultProps = {
  alertsNum: 0
};

export default TopBarAlertsButton;
