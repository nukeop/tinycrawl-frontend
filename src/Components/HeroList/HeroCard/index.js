import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import {
  Grid,
  Header,
  Icon
} from 'semantic-ui-react';

import styles from './styles.scss';

const HeroCard = props => {
  const {
    definitions,
    hero
  } = props;
  
  return (
    <Link to={`/hero/${_.get(hero, '_id')}`} className={styles.hero_card}>
      <Grid>
        <Grid.Row>
          <Header inverted as='h3'>
            { hero.name }
            <Header.Subheader>
              {
                `Level ${_.get(hero, 'level')} `
              }
              {
                _.get(
                  _.find(definitions.heroclasses, { id: hero.heroClass }),
                  'prettyName'
                )
              }
            </Header.Subheader>
          </Header>
          <Icon name='angle right' size='big'/>
        </Grid.Row>
      </Grid>
    </Link>
  );
};

HeroCard.propTypes = {
  hero: PropTypes.shape({
    name: PropTypes.string
  }),
  definitions: PropTypes.object
};

HeroCard.defaultProps = {
  hero: {},
  definitions: {}
};

export default HeroCard;
