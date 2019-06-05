import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

import styles from './styles.scss';

const TraitsList = props => {
  const { traits } = props;
  return (
    <>
      <Header invert as='h3'>
        Traits
      </Header>
      {
        _.map(traits, trait => {
          return (
            <>
              <Grid.Row>
                <Header inverted as='h4'>
                  { trait.prettyName }
                </Header>
              </Grid.Row>
              <Grid.Row className={styles.trait_description_row}>
                { trait.description }
              </Grid.Row>
            </>
          );
        })
      }
    </>
  );
};

TraitsList.propTypes = {
  traits: PropTypes.array
};

TraitsList.defaultProps = {
  traits: []
};

export default TraitsList;
