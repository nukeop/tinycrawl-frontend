import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Feed,
  Divider,
  Header,
  Popup
} from 'semantic-ui-react';

import FeedItem from '../FeedItem';
import FeedFooter from '../FeedFooter';

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
      <Popup.Content>
        {
          _.map(notificationEvents, (event, i) => {
            return (
              <FeedItem
                icon={ event.icon }
              >
                { event.contents }
              </FeedItem>
            );
          })
        }
      </Popup.Content>
      <FeedFooter />
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
