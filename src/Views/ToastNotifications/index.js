import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Toast from '../../Components/Toast';

import styles from './styles.scss';

const ToastNotifications = props => {
  return (
    _.map(props.notifications, (notification, i) =>
      <Toast
        key={i}
        level={notification.level}
      >
        { notification.content }
      </Toast>
    )
  );
};

ToastNotifications.propTypes = {
  notifications: PropTypes.array
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
