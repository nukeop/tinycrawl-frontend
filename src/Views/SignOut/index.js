import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userSignOut } from '../../actions/user';

class SignOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.signOut();
    this.props.history.replace('/');
  }  

  render() {
    return null;
  }
}

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func
  })
};

function mapDispatchToProps(dispatch) {
  return {
    signOut: bindActionCreators({ userSignOut }, dispatch).userSignOut
  };
}

export default connect(null, mapDispatchToProps)(withRouter(SignOut));
