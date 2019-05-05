import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ItemActions from '../../actions/items';
import * as UserActions from '../../actions/user';
import LoggedInOnly from '../../Components/LoggedInOnly';
import Inventory from '../../Components/Inventory';

class InventoryView extends React.Component {
  componentDidMount() {
    const {
      user,
      items,
      itemActions
    } = this.props;
    const username = _.get(user, 'credentials.username');
    const inventory = _.get(user, `inventories[${username}]`);
    const itemsInInventory = _.get(inventory, 'items');

    _.forEach(itemsInInventory, item => {
      if (_.isNil(_.get(items, item))) {
        itemActions.getItem(item);
      }
    });
  }
  
  render() {
    const {
      user,
      items
    } = this.props;
    const username = _.get(user, 'credentials.username');
    const inventory = _.get(user, `inventories[${username}]`);
    const itemsInInventory = _.get(inventory, 'items');
    const itemsData = _.map(itemsInInventory, item => _.get(items, item));
    
    return (
      <Inventory
        items={ itemsData }
      />
    );
  }
}

InventoryView.propTypes = {
  user: PropTypes.shape({
    credentials: PropTypes.shape({
      username: PropTypes.string,
      token: PropTypes.string
    })
  }),
  items: PropTypes.object,
  userActions: PropTypes.shape({

  }),
  itemActions: PropTypes.shape({
    getItem: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string
    })
  })
};

InventoryView.defaultProps = {
  user: {},
  items: {},
  match: {}
};

function mapStateToProps(state) {
  return {
    user: state.user,
    items: state.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    itemActions: bindActionCreators(ItemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryView);
