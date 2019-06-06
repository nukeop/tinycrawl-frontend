import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Rail,
  Responsive,
  Segment
} from 'semantic-ui-react';

import HeroAbilities from './HeroAbilities';
import HeroEquipmentSlots from './HeroEquipmentSlots';
import HeroMoves from './HeroMoves';
import HeroSelection from './HeroSelection';
import HeroStats from './HeroStats';
import TraitPointsMessage from './TraitPointsMessage';
import TraitsList from './TraitsList';

import styles from './styles.scss';

const HeroView = props => {
  const {
    loading,
    hero,
    heroes,
    deleteHero
  } = props;
  
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
              {
                !loading &&
                <Responsive
                  minWidth={ 1366 }
                  as={Rail}
                  position='left'
                >
                  <Segment inverted>
                    <HeroSelection
                      heroes={ heroes }
                    />
                  </Segment>
                </Responsive>
              }
              <Grid.Row>
                <Header inverted as='h1'>
                  { hero.name }
                  <Header.Subheader>
                    { _.get(hero, 'heroClass.prettyName') }
                  </Header.Subheader>
                </Header>
                <Button
                  floated='right'
                  icon='close'
                  color='red'
                  inverted
                  onClick={ deleteHero }
                />
              </Grid.Row>
              {
                _.get(hero, 'traitPoints') > 0 &&
                  <TraitPointsMessage
                    points={ _.get(hero, 'traitPoints') }
                  />
              }
              <Divider inverted />
              <Grid.Row columns={ 2 }>
                <Grid.Column>
                  <HeroStats hero={ hero } />
                  <Divider />
                  <HeroEquipmentSlots slots={ _.get(hero, 'slots') }/>
                </Grid.Column>
                <Grid.Column>
                  <HeroAbilities abilities={ _.get(hero, 'abilities') }/>
                  <Divider />
                  <HeroMoves moves={ _.get(hero, 'moves') } />
                </Grid.Column>
              </Grid.Row>
              <Divider inverted />
              <TraitsList traits={ _.get(hero, 'traits') } />
            </Segment>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

HeroView.propTypes = {
  hero: PropTypes.shape({
    name: PropTypes.string,
    heroClass: PropTypes.string,
    level: PropTypes.number,
    moves: PropTypes.array,
    traits: PropTypes.array,
    abilities: PropTypes.array
  }),
  heroes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      heroClass: PropTypes.string,
      level: PropTypes.number
    })
  ),
  deleteHero: PropTypes.func,
  loading: PropTypes.bool
};

HeroView.defaultProps = {
  hero: {},
  deleteHero: () => {},
  loading: false
};

export default HeroView;
