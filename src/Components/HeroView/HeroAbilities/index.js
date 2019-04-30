import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header
} from 'semantic-ui-react';

import styles from './styles.scss';

const HeroAbilities = props => {
  const { abilities } = props;
  return (
    <React.Fragment>
      <Grid.Row>
        <Header inverted as='h3'>Abilities</Header>
      </Grid.Row>

      <Grid.Column>
        {
          _.map( abilities, ability => {
            return (
              <Grid.Row className={styles.hero_ability}>
                <Header as='h4' inverted>
                  { ability.prettyName }
                  <Header.Subheader>
                    { ability.description }
                  </Header.Subheader>
                </Header>
              </Grid.Row>
            );
          })
        }
      </Grid.Column>
    </React.Fragment>
  );
};

HeroAbilities.propTypes = {
  abilities: PropTypes.array
};

HeroAbilities.defaultProps = {
  abilities: []
};

export default HeroAbilities;
