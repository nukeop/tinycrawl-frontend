import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../../actions/user';
import EditProfile from '../../Components/EditProfile';

const EditProfileView = props => {
  const {
    user
  } = props;

  const username = _.get(user, 'credentials.username');
  const userData = _.get(user, `users[${username}]`);
  
  return (
    <EditProfile
      user={ userData }
    />
  );
};

EditProfileView.propTypes = {

};

EditProfileView.defaultProps = {

};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileView);
