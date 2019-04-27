import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header
} from 'semantic-ui-react';

import styles from './styles.scss';

const HeroCard = props => {
  const {
    definitions,
    hero
  } = props;

  return (
    <div className={styles.hero_card}>
      <Grid>
        <Grid.Row>
          <Header inverted as='h3'>
            { hero.name }
            <Header.Subheader>
              {
                _.get(
                  _.find(definitions.heroclasses, { id: hero.heroClass }),
                  'prettyName'
                )
              }
            </Header.Subheader>
          </Header>
        </Grid.Row>
      </Grid>
    </div>
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
