import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Grid,
  Icon
} from 'semantic-ui-react';

import styles from './styles.scss';

const FeedItem = props => {
  const {
    icon,
    children,
    last
  } = props;
  
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={ 2 }>
          <Icon name={ icon } />
        </Grid.Column>
        <Grid.Column width={ 14 }>
          { children }
        </Grid.Column>
      </Grid.Row>
      <Divider />
    </Grid>
  );
};

FeedItem.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
  last: PropTypes.bool
};

FeedItem.defaultProps = {
  icon: null,
  children: null,
  last: false
};

export default FeedItem;
