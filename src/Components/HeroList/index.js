import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';
import _ from 'lodash';

import HeroCard from './HeroCard';
import HeroCardPlaceholder from './HeroCard/HeroCardPlaceholder';

import styles from './styles.scss';

const HeroList = props => {
  const {
    definitions,
    heroes,
    loading
  } = props;

  return (
    <Grid
      centered
      padded
      className={styles.hero_list}
    >
      <Grid.Column>
        <Grid.Row centered>
          <Segment inverted>
            <Button primary inverted fluid size='huge' as={ Link } to='/create-hero'>
              Create a hero
            </Button>
          </Segment>
        </Grid.Row>
        <Divider />
        <Grid.Row centered>
          <Segment
            inverted
          >
            {
              _.isEmpty(heroes) && loading &&
                <React.Fragment>
                  <HeroCardPlaceholder />
                  <Divider/>
                  <HeroCardPlaceholder />
                  <Divider/>
                  <HeroCardPlaceholder />
                </React.Fragment>
            }
            {
              _.isEmpty(heroes) && !loading && 
                <Header>You have no heroes.</Header>
            }
            {
              _.map(heroes, (hero, i) => {
                return (
                  <>
                    <HeroCard
                      key={ hero.id }
                      hero={ hero }
                      definitions={ definitions }
                    />
                    { i < heroes.length - 1 && <Divider />}
                  </>
                );
              })
            }
          </Segment>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

HeroList.propTypes = {
  heroes: PropTypes.object,
  definitions: PropTypes.object,
  loading: PropTypes.bool
};

HeroList.defaultProps = {
  heroes: {},
  definitions: {},
  loading: false
};

export default HeroList;
