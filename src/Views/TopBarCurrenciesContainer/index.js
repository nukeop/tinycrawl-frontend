import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as UserActions from '../../actions/user';

import TopBarCurrencies from '../../Components/TopBarCurrencies';

class TopBarCurrenciesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      user,
      userActions,
      definitions,
      definitionsActions
    } = this.props;
    
    const username = _.get(user, 'credentials.username');
    const inventory = _.get(user, `inventories[${username}]`);
    if (_.isNil(inventory) || _.isString(inventory) || inventory.error) {
      userActions.getUserInventory(username);
    }

    if(_.isEmpty(definitions)) {
      definitionsActions.getDefinitions();
    }
  }
  
  render() {
    const {
      user,
      definitions
    } = this.props;

    const username = _.get(user, 'credentials.username');
    const currencies = _.get(user, `inventories[${username}].currencies`);
    
    return (
      <TopBarCurrencies
        currenciesDefinitions={ _.get(definitions, 'currencies') }
        currencies={ currencies }
        loading={
          definitions.loading ||
            _.isNil(currencies) ||
            _.isNil(_.get(definitions, 'currencies'))
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    definitions: state.definitions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    definitionsActions: bindActionCreators(DefinitionsActions, dispatch)
  };
}

TopBarCurrenciesContainer.propTypes = {
  user: PropTypes.object,
  userActions: PropTypes.shape({
    getUserInventory: PropTypes.func
  }),
  definitions: PropTypes.object,
  definitionsActions: PropTypes.shape({
    getDefinitions: PropTypes.func
  })
};

TopBarCurrenciesContainer.defaultProps = {
  user: {},
  userActions: {},
  definitions: {},
  definitionsActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBarCurrenciesContainer);
