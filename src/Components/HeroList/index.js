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

import styles from './styles.scss';

const HeroList = props => {
  const { heroes } = props;

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
          <Segment inverted loading={_.get(heroes, 'loading')}>
            {
              _.isEmpty(_.get(heroes, 'heroes')) &&
                <Header>You have no heroes.</Header>
            }
            {
              _.map(_.get(heroes, 'heroes'), hero => {
                return <HeroCard key={ hero.id } hero={ hero }/>;
              })
            }
          </Segment>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

HeroList.propTypes = {
  heroes: PropTypes.object
};

HeroList.defaultProps = {
  heroes: {}
};

export default HeroList;
