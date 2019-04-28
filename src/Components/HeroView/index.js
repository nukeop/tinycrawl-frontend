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
                <Grid.Column className={styles.hero_stats_column}>
                  <Grid.Row>
                    <Header inverted as='h3'>
                      Stats
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <label>Class:</label>
                    <span>{ _.get(hero, 'heroClass.prettyName') }</span>
                  </Grid.Row>
                  <Grid.Row>
                    <label>Level:</label>
                    <span>{ hero.level }</span>
                  </Grid.Row>
                  <Grid.Row>
                    <label>HP:</label>
                    <span>{ `${hero.currentHp}/${hero.baseHp}` }</span>
                  </Grid.Row>
                  <Grid.Row>
                    <label>Attack:</label>
                    <span>{ hero.baseAttack }</span>
                  </Grid.Row>
                  <Grid.Row>
                    <label>Defense:</label>
                    <span>{ hero.baseDefense }</span>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column>test2</Grid.Column>
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
