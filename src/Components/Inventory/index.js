import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
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
    activeItem,
    refresh,
    loading
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
                    <Grid.Row>
                      <Header inverted as='h1'>
                        Inventory
                      </Header>
                      <Button
                        inverted
                        icon='refresh'
                        floated='right'
                        loading={ loading }
                        onClick={ refresh }
                      />
                    </Grid.Row>
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
  }),
  refresh: PropTypes.func,
  loading: PropTypes.bool
};

Inventory.defaultProps = {
  items: [],
  activeItem: null,
  refresh: () => {},
  loading: false
};

export default Inventory;
