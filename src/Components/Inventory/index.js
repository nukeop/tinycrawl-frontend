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

import styles from './styles.scss';

const Inventory = props => {
  const { items } = props;
  
  return (
    <Grid centered padded className={styles.inventory}>
      <Grid.Row centered>
        <Grid.Column>
          <Container>
            <Segment inverted>
              <Grid>
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
                    />
                  </Grid.Column>
                  <Grid.Column>

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
  items: PropTypes.array
};

Inventory.defaultProps = {
  items: []
};

export default Inventory;
