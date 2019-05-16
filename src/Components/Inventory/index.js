import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Loader,
  Segment
} from 'semantic-ui-react';

import InventoryList from './InventoryList';
import InventoryItemDetails from './InventoryItemDetails';

import styles from './styles.scss';

const EmptyState = () => {
  return (
    <Segment inverted className={styles.empty_state}>
      <Grid centered verticalAlign='middle'>
        <Grid.Column>
          <Grid.Row>
            <Icon name='archive' size='huge' />
          </Grid.Row>
          <Grid.Row>
            <Header as='h1' inverted>
            Inventory is empty
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

const Inventory = props => {
  const {
    items,
    activeItem,
    refresh,
    useItem,
    loading
  } = props;
  
  return (
    <Grid centered padded className={styles.inventory}>
      <Grid.Row centered>
        <Grid.Column>
          <Container>
            <Segment inverted>
              <Dimmer active={ loading }>
                <Loader />
              </Dimmer>
              <Grid className={styles.inventory_grid}>
                <Grid.Row className={styles.header_row}>
                  <Grid.Column>
                    <Grid.Row className={styles.header_elements_row}>
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
                {
                  _.isEmpty(items) && !loading
                    ? <EmptyState />
                    : <Grid.Row columns={ 2 } className={styles.inventory_list_container} >
                      <Grid.Column className={styles.inventory_list_column}>
                        <InventoryList
                          items={ items }
                          activeItem={ activeItem }
                        />
                      </Grid.Column>
                      <Grid.Column className={styles.item_details_column}>
                        <InventoryItemDetails
                          item={ activeItem }
                          useItem={ useItem }
                        />
                      </Grid.Column>
                    </Grid.Row>
                }
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
  useItem: PropTypes.func,
  loading: PropTypes.bool
};

Inventory.defaultProps = {
  items: [],
  activeItem: null,
  refresh: () => {},
  useItem: () => {},
  loading: false
};

export default Inventory;
