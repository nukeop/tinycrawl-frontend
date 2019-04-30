import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header,
  Icon
} from 'semantic-ui-react';

import styles from './styles.scss';

const HeroMoves = props => {
  const { moves } = props;
  return (
    <React.Fragment>
      <Grid.Row>
        <Header inverted as='h3'>
          Moves
        </Header>
      </Grid.Row>
      <Grid.Column>
        {
          _.map(moves, move => {
            return (
              <Grid.Row className={styles.hero_move}>
                <Header inverted as='h4'>
                  { move.prettyName }
                  <Header.Subheader color='yellow'
                    className={styles.hero_move_cooldown}>
                    <Icon name='clock outline'/>
                    <span> { move.cooldown }</span>
                  </Header.Subheader>
                  <Header.Subheader>
                    { move.description }
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

HeroMoves.propTypes = {
  moves: PropTypes.array
};

HeroMoves.defaultProps = {
  moves: []
};

export default HeroMoves;
