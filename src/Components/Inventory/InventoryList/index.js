import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import {
  Item
} from 'semantic-ui-react';

import styles from './styles.scss';

const isValid = item => {
  return !_.isNil(item) && !item.loading;
};

const InventoryList = props => {
  const {
    items,
    activeItem
  } = props;
  
  return (
    <Item.Group className={styles.inventory_list}>
      {
        _.map(_.filter(items, isValid), item => {
          const shortLore = _.get(item, 'shortLore');
          return (
            <Item
              key={ _.get(item, 'id') }
              as={ Link }
              to={`/inventory/item/${_.get(item, 'id')}`}
              className={cx({ active: _.get(item, 'id') === _.get(activeItem, 'id') })}
            >
              <Item.Content>
                <Item.Header>
                  { _.get(item, 'name') }
                </Item.Header>
                {
                  shortLore &&
                <Item.Description>
                  { shortLore }
                </Item.Description>
                }
              </Item.Content>
            </Item>
          );
        })
      }
    </Item.Group>
  );
};

InventoryList.propTypes = {
  items: PropTypes.array,
  activeItem: PropTypes.shape({
    id: PropTypes.string
  })
};

InventoryList.defaultProps = {
  items: [],
  activeItem: null
};

export default InventoryList;
