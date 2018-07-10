import React from 'react';
import { Button, Frame, Heading } from 'arwes';

import Row from '../../Components/Row';
import Column from '../../Components/Column';
import Panel from '../../Components/Panel';

import styles from './styles.scss';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Column grow={1} className={styles.login_screen}>
        <Panel fluid className={styles.login_panel}>
          <Frame animate corners={2}>
            <Column className={styles.login_panel_column}>
              <Heading node='h2'>Log in</Heading>

              <Column>
                <label>Username:</label>
                <input name='username' type='text'/>
              </Column>
              <Column>
                <label>Password:</label>
                <input name='password' type='password' />
              </Column>
              
              <Row className={styles.login_button_row}>
                <Button animate>Log in</Button>
              </Row>
            </Column>
            
          </Frame>
        </Panel>
      </Column>  
    );
  }
}

LoginScreen.propTypes = {

};

LoginScreen.defaultProps = {

};

export default LoginScreen;
