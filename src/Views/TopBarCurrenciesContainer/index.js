import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../../actions/user'; 

class TopBarCurrenciesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const username = _.get(this.props.user, 'credentials.username');
    const inventory = _.get(this.props, `user.users[${username}].inventory`);
    if (_.isNil(inventory) || _.isString(inventory)) {
      this.props.userActions.getUserInventory(username);
    }
  }
  
  render() {
    return (
      null
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  };
}

TopBarCurrenciesContainer.propTypes = {
  user: PropTypes.object
};

TopBarCurrenciesContainer.defaultProps = {
  user: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBarCurrenciesContainer);
