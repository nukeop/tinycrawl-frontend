import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header,
  List
} from 'semantic-ui-react';

import HPBar from '../HPBar';
import ExperienceBar from '../ExperienceBar';

import styles from './styles.scss';

const HeroStats = props => {
  const { hero } = props;

  return (
    <div className={styles.hero_stats_column}>
      <Grid.Row>
        <Header inverted as='h3'>
          Stats
        </Header>
      </Grid.Row>
      <ExperienceBar
        value={ _.get(hero, 'experience')}
        total={_.get(hero, 'level') * 1000}
      />
      <HPBar
        value={ hero.currentHp }
        total={ hero.baseHp }
      />
      <List inverted divided relaxed>
        <List.Item>
          <Grid.Row>
            <label>Level:</label>
            <span>{ hero.level }</span>
          </Grid.Row>
        </List.Item>
        <List.Item>
          <Grid.Row>
            <label>Attack:</label>
            <span>{ hero.baseAttack }</span>
          </Grid.Row>
        </List.Item>
        <List.Item>
          <Grid.Row>
            <label>Defense:</label>
            <span>{ hero.baseDefense }</span>
          </Grid.Row>
        </List.Item>
      </List>
    </div>
  );
};

HeroStats.propTypes = {
  hero: PropTypes.shape({
    heroClass: PropTypes.shape({
      prettyName: PropTypes.string
    }),
    level: PropTypes.number,
    currentHp: PropTypes.number,
    baseHp: PropTypes.number,
    baseAttack: PropTypes.number,
    baseDefense: PropTypes.number
  })
};

HeroStats.defaultProps = {
  hero: {}
};

export default HeroStats;
