import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import {
  Message
} from 'semantic-ui-react';

import GameIcon from '../../GameIcon';

import styles from './styles.scss';

const TraitPointsMessage = props => {
  const { match, points } = props;
  return (
    <Message positive as={Link} to={`${match.url}/traits`} className={styles.trait_points_message}>
      <GameIcon name='upgrade' size='big'/>
      <Message.Content>
        <Message.Header>
        Unused trait points
        </Message.Header>
        You still have { points } trait points left to spend.
      </Message.Content>
    </Message>
  );
};

TraitPointsMessage.propTypes = {
  points: PropTypes.number.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export default withRouter(TraitPointsMessage);
