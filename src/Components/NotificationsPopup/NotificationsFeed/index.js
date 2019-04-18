import React from 'react';
import PropTypes from 'prop-types';
import {
  Feed,
  Divider,
  Header,
  Popup
} from 'semantic-ui-react';

import styles from './styles.scss';

const NotificationsFeed = props => {
  const {
    notificationEvents
  } = props;
  
  return (
    <React.Fragment>
      <Popup.Header>
        Notifications
      </Popup.Header>
      <Divider />
      <Feed events={notificationEvents}>
      </Feed>
    </React.Fragment>
  );
};

NotificationsFeed.propTypes = {
  notificationEvents: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      image: PropTypes.string,
      meta: PropTypes.string,
      summary: PropTypes.string
    })
  )
};

NotificationsFeed.defaultProps = {
  notificationEvents: []
};

export default NotificationsFeed;
