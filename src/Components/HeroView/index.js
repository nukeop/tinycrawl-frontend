import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Divider,
  Grid,
  Header,
  Rail,
  Segment
} from 'semantic-ui-react';

import HeroAbilities from './HeroAbilities';
import HeroEquipmentSlots from './HeroEquipmentSlots';
import HeroStats from './HeroStats';

import styles from './styles.scss';

const HeroView = props => {
  const {
    loading,
    hero
  } = props;
  console.log(hero);
  
  return (
    <Grid
      centered
      padded
      className={styles.hero_view}
    >
      <Grid.Row centered>
        <Grid.Column>
          <Container text>
            <Segment inverted loading={ loading }>
              <Grid.Row>
                <Header inverted as='h1'>
                  { hero.name }
                </Header>
              </Grid.Row>
              <Divider inverted />
              <Grid.Row columns={ 2 }>
                <Grid.Column>
                  <HeroStats hero={ hero } />
                  <Divider />
                  <HeroEquipmentSlots slots={ _.get(hero, 'slots') }/>
                </Grid.Column>
                <Grid.Column>
                  <HeroAbilities abilities={ _.get(hero, 'abilities') }/>
                </Grid.Column>
              </Grid.Row>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

HeroView.propTypes = {
  hero: PropTypes.shape({
    name: PropTypes.string
  }),
  loading: PropTypes.bool
};

HeroView.defaultProps = {
  hero: {},
  loading: false
};

export default HeroView;
