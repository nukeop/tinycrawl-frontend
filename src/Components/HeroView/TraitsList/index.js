import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Button, Grid, Header } from 'semantic-ui-react';

import styles from './styles.scss';

const TraitsList = props => {
  const { match, traits } = props;
  return (
    <>
      <Grid.Row className={styles.hero_traits_header_row}>
        <Header inverted as='h3'>
          Traits
        </Header>
        <Button
          compact
          primary
          size='tiny'
          as={ Link }
          to={`${match.url}/traits`}
        >
          Edit
        </Button>
      </Grid.Row>
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

export default withRouter(TraitsList);
