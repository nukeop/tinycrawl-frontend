import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Divider,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';

import InventoryList from './InventoryList';
import InventoryItemDetails from './InventoryItemDetails';

import styles from './styles.scss';

const Inventory = props => {
  const {
    items,
    activeItem
  } = props;
  
  return (
    <Grid centered padded className={styles.inventory}>
      <Grid.Row centered>
        <Grid.Column>
          <Container>
            <Segment inverted>
              <Grid className={styles.inventory_grid}>
                <Grid.Row className={styles.header_row}>
                  <Grid.Column>
                    <Header inverted as='h1'>
                    Inventory
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider inverted />
                <Grid.Row columns={ 2 }>
                  <Grid.Column>
                    <InventoryList
                      items={ items }
                      activeItem={ activeItem }
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <InventoryItemDetails
                      item={ activeItem }
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Inventory.propTypes = {
  items: PropTypes.array,
  activeItem: PropTypes.shape({
    id: PropTypes.string
  })
};

Inventory.defaultProps = {
  items: [],
  activeItem: null
};

export default Inventory;
