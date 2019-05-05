import React from 'react';
import PropTypes from 'prop-types';
import {
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
            {
              _.get(item, 'longLore') &&
            <Grid.Row>
              <Segment inverted>
                { _.get(item, 'longLore') }
              </Segment>
            </Grid.Row>
            }
            <Grid.Row>
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
