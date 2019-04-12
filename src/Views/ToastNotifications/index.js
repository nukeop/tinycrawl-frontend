import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Toast from '../../Components/Toast';

const ToastNotifications = props => {
  return (
    _.map(props.notifications, (notification, i) =>
      <Toast
        key={ i }
        title={ notification.title }
        level={ notification.level }
        style={{
          bottom: `calc(${i*2}em + ${70*i}px)`
        }}
      >
        { notification.content }
      </Toast>
    )
  );
};

ToastNotifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      level: PropTypes.string
    })
  )
};

ToastNotifications.defaultProps = {
  notifications: []
};

function mapStateToProps(state) {
  return {
    notifications: state.notifications.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotifications);
