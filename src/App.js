import React from 'react';
import {
  Arwes,
  Footer,
  Header,
  Heading,
  ThemeProvider,
  createTheme
} from 'arwes';

import Column from './Components/Column';
import Row from './Components/Row';
import TopBar from './Views/TopBar';
import ToastNotifications from './Views/ToastNotifications';

import constants from './constants';
import routes from './routes';
import bg from '../resources/bg.jpg';

import '../resources/boxicons/css/boxicons.min.css';

import './colors.scss';
import './mixin.scss';
import './normalize.scss';
import './global.scss';
import arwesStyles from './arwes.scss';
import styles from './styles.scss';

const App = () => {
  return (
    <div className='app_container'>
      <ThemeProvider theme={createTheme()}>
        <Arwes
          animate
          background={bg}
          classes={{
            main: arwesStyles.arwes_main
          }}
        >
          <Column grow={1} className={styles.main_layout_column}>
            <Row>
              <Header animate classes={{
                root: arwesStyles.arwes_header_root,
                children: arwesStyles.arwes_header_children
              }}
              >
                <Heading node='h3'>
                  Tinycrawl
                </Heading>
                <TopBar />
              </Header>
            </Row>
            <Row grow={2} className={styles.routes_row}>
              { routes() }
            </Row>
            <Row>
              <Footer classes={{
                root: arwesStyles.arwes_footer_root,
                children: arwesStyles.arwes_footer_children
              }}
              >
                <constants.copyrightText/>
              </Footer>
            </Row>
            <ToastNotifications />
          </Column>
        </Arwes>
      </ThemeProvider>
    </div>
  );
};

App.propTypes = {

};

App.defaultProps = {

};

export default App;
