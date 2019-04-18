import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid
} from 'semantic-ui-react';

import styles from './styles.scss';

const FeedFooter = props => {
  return (
    <Grid className={ styles.feed_footer }>
      <Grid.Row textAlign='center'>
        <Link to='/notifications'>
          See all notifications
        </Link>
      </Grid.Row>
    </Grid>
  );
};

FeedFooter.propTypes = {

};

FeedFooter.defaultProps = {

};

export default FeedFooter;
