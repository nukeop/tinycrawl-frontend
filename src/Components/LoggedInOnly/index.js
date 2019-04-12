import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';

import styles from './styles.scss';

const goToLogin = history => () => {
  history.push('login');
};

const LoggedInOnly = props => {
  return (
    <div className={styles.logged_in_only}>
      <Segment inverted padded='very'>
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <Header inverted as='h1'>
                <Icon name='lock'/>
                This content is only available for logged in users.
              </Header>
            </Grid.Row>
            <Grid.Row centered>
              <Button primary onClick={ goToLogin(props.history) }>
                Go to login page
                <Icon name='right arrow'/>
              </Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        
      </Segment>
    </div>
  );
};

LoggedInOnly.propTypes = {
  history: PropTypes.object
};

export default withRouter(LoggedInOnly);
