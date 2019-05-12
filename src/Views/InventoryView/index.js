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
    this.refreshItems();
  }
  
  componentDidUpdate() {
    this.refreshItems();
  }

  refreshItems() {
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
      items,
      userActions,
      match
    } = this.props;
    
    const username = _.get(user, 'credentials.username');
    const inventory = _.get(user, `inventories[${username}]`);
    const itemsInInventory = _.get(inventory, 'items');
    const itemsData = _.map(itemsInInventory, item => _.get(items, item));
    const activeItem = _.find(itemsData, { id: _.get(match, 'params.itemId') });
    
    return (
      <Inventory
        items={ itemsData }
        activeItem={ activeItem }
        refresh={ () => userActions.getUserInventory(username) }
        loading={ _.get(inventory, 'loading') }
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
    getUserInventory: PropTypes.func
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
  userActions: {},
  itemActions: {},
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
