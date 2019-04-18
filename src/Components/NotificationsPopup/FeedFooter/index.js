import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid
} from 'semantic-ui-react';

import styles from './styles.scss';

const FeedFooter = () => {
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

export default FeedFooter;
