import React from 'react';
import {
  Arwes,
  Footer,
  Header,
  Heading,
  ThemeProvider,
  createTheme
} from 'arwes';
import { NavLink } from 'react-router-dom';

import Column from './Components/Column';
import Row from './Components/Row';
import Menu from './Components/Menu';
import { MenuButton } from './Components/Menu';

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
                <Menu rightAligned>
                  <MenuButton>
                    <NavLink to='/login' activeClassName={styles.active_link}>
                      <i className='bx bx-user-circle'></i>
                    </NavLink>
                  </MenuButton>
                </Menu>
              </Header>
            </Row>
            <Row grow={2}>
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
