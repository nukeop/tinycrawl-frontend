import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  Grid,
  Header,
  Label,
  Segment
} from 'semantic-ui-react';

import { categoryEnumToName } from '../../../utils';
import styles from './styles.scss';

const InventoryItemDetails = props => {
  const { item } = props;
  console.log(item);
  return (
    <Segment inverted className={styles.inventory_item_details}>
      {
        item &&
          <React.Fragment>
            <Grid.Row>
              <Header inverted as='h1'>
                { _.get(item, 'name') }
                <Header.Subheader>
                  { categoryEnumToName(_.get(item, 'category')) }
                </Header.Subheader>
              </Header>
            </Grid.Row>
            <Grid.Column>
              <Divider inverted />
            </Grid.Column>
            <Grid.Row className={styles.labels_row}>
              <Label color='orange'>
                Charges
                <Label.Detail>
                  { _.get(item, 'charges') }
                </Label.Detail>
              </Label>
              <Label color='violet'>
                Potency
                <Label.Detail>
                  { _.get(item, 'potency') }
                </Label.Detail>
              </Label>
            </Grid.Row>
            {
              _.get(item, 'longLore') &&
                <Grid.Row className={styles.lore_row}>
                  <Segment inverted>
                    { _.get(item, 'longLore') }
                  </Segment>
                </Grid.Row>
            }
            {
              (_.get(item, 'category') === 'CONSUMABLE' ||
               _.get(item, 'category') === 'USABLE') &&
              <Grid.Row className={styles.buttons_row}>
                <Button primary>
                  Use
                </Button>
              </Grid.Row>
            }
          </React.Fragment>
      }
    </Segment>
  );
};

InventoryItemDetails.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string
  })
};

InventoryItemDetails.defaultProps = {
  item: null
};

export default InventoryItemDetails;
