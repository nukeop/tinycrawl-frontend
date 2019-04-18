import React from 'react';
import PropTypes from 'prop-types';
import {
  Popup
} from 'semantic-ui-react';

import TopBarNotificationsButton from '../TopBarNotificationsButton';
import NotificationsFeed from './NotificationsFeed';

import styles from './styles.scss';

class NotificationsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  
  render(){
    const {
      notificationEvents
    } = this.props;
    
    return (
      <Popup
        className={ styles.notifications_popup }
        inverted
        wide
        position='bottom right'
        on='click'
        open={ this.state.open }
        onClose={ this.handleClose.bind(this) }
        onOpen={ this.handleOpen.bind(this) }
        trigger={
          <TopBarNotificationsButton
            onClick={ this.handleOpen.bind(this) }
            alertsNum={ notificationEvents.length }
          />
        }
      >
        <NotificationsFeed
          notificationEvents={ notificationEvents }
        />
      </Popup>
    );
  }
}

NotificationsPopup.propTypes = {
  notificationEvents: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      image: PropTypes.string,
      meta: PropTypes.string,
      summary: PropTypes.string
    })
  )
};

NotificationsPopup.defaultProps = {
  notificationEvents: []
};

export default NotificationsPopup;
