import 'semantic-ui-css/semantic.min.css';

import './colors.scss';
import './mixin.scss';
import './normalize.scss';
import './global.scss';

import React from 'react';
import {
  Grid,
  Segment
} from 'semantic-ui-react';

import TopBar from './Views/TopBar';
import ToastNotifications from './Views/ToastNotifications';

import constants from './constants';
import routes from './routes';

import styles from './styles.scss';

const App = () => {
  return (
    <div className='app_container'>
      <Grid columns={1} className={styles.app_grid}>
        <Grid.Column className={styles.app_column}>
          <Grid.Row>
            <TopBar />
          </Grid.Row>
          
          <Grid.Row className={styles.routes_row}>
            { routes() }
          </Grid.Row>
          <Grid.Row className={styles.footer_row}>
            <Segment vertical inverted size='small'>
              <constants.copyrightText />
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <ToastNotifications />
    </div>
  );
};

export default App;
