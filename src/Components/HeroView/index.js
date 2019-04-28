import React from 'react';
import PropTypes from 'prop-types';
import {
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
  console.log(hero)
  return (
    <Grid
      centered
      padded
      >
      <Grid.Row centered>
        <Grid.Column>
          <Segment>
            <Header>
              { hero.name }
            </Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

HeroView.propTypes = {
  hero: PropTypes.shape({
    name: PropTypes.string
  })
};

HeroView.defaultProps = {
  hero: {}
};

export default HeroView;
