import React from 'react';
import PropTypes from 'prop-types';
import {
  Item
} from 'semantic-ui-react';

import styles from './styles.scss';

const InventoryList = props => {
  const { items } = props;
  return (
    <Item.Group className={styles.inventory_list}>
      {
        _.map(items, item => {
          const shortLore = _.get(item, 'shortLore');
          return (
            <Item>
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
  items: PropTypes.array
};

InventoryList.defaultProps = {
  items: []
};

export default InventoryList;
