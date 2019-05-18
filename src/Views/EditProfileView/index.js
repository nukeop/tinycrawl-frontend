import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../../actions/user';
import EditProfile from '../../Components/EditProfile';

const EditProfileView = props => {
  const {
    user,
    actions
  } = props;

  const username = _.get(user, 'credentials.username');
  const token = _.get(user, 'credentials.token');
  const userData = _.get(user, `users[${username}]`);
  const userId = _.get(userData, 'id');
  
  return (
    <EditProfile
      user={ userData }
      putUser={ body => actions.putUser(userId, token, body) }
      getUser={ () => actions.getUser(username, token) }
    />
  );
};

EditProfileView.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.shape({
    getUser: PropTypes.func,
    putUser: PropTypes.func
  })
};

EditProfileView.defaultProps = {
  user: {},
  actions: {}
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileView);
