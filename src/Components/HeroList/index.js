import React from 'react';
import PropTypes from 'prop-types';
import { Frame, Words } from 'arwes';
import _ from 'lodash';

import Column from '../Column';
import Panel from '../Panel';
import CreateHeroButton from './CreateHeroButton';
import HeroCard from './HeroCard';

import styles from './styles.scss';

const HeroList = props => {
  return (
    <Column grow={1} className={styles.hero_list}>
      <Panel container className={styles.create_hero_panel}>
          <Column grow={1} className={styles.create_hero_column}>
            <CreateHeroButton />
        </Column>
        </Panel>
      <Panel container className={styles.hero_list_panel}>
        <Frame animate corners={2}>
          <Column grow={1} className={styles.hero_list_inner}>
            {
              _.isEmpty(props.heroes) &&
              <Words> You have no heroes. </Words>
            }
            {
              _.map(props.heroes, hero => {
                return <HeroCard key={hero.id} hero={hero}/>;
              })
            }
          </Column>
        </Frame>
      </Panel>
    </Column>
  );
};

HeroList.propTypes = {
  heroes: PropTypes.array
};

HeroList.defaultProps = {
  heroes: []
};

export default HeroList;
