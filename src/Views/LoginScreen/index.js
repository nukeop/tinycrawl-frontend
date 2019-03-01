import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Frame, Heading, Loading } from 'arwes';

import * as UserActions from '../../actions/user';

import Row from '../../Components/Row';
import Column from '../../Components/Column';
import Panel from '../../Components/Panel';

import styles from './styles.scss';

const LoginForm = props => {
  return (
    <React.Fragment>
      <Heading node='h2'>Log in</Heading>
      <Column>
        <label>Username:</label>
        <input
          name='username'
          type='text'
          onChange={ props.onUsernameChange }
          value={ props.username }
        />
      </Column>
      <Column>
        <label>Password:</label>
        <input
          name='password'
          type='password'
          onChange={ props.onPasswordChange }
          value={ props.password }
        />
      </Column>             
      <Row className={styles.login_button_row}>
        <Button animate onClick={ props.logIn }>Log in</Button>
      </Row>
    </React.Fragment>
  );
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  logIn() {
    this.props.actions.userAuth(this.state.username, this.state.password);
  }

  render() {
    let {
      user
    } = this.props;
    
    return (
      <Column grow={1} className={styles.login_screen}>
        <Panel fluid className={styles.login_panel}>
          <Frame animate corners={2}>
            <Column className={styles.login_panel_column}>

              {
                (user.credentials && user.credentials.loading)
                  ? <div className={styles.loader_container}>
                    <Loading animate />
                  </div>
                  : <LoginForm
                    onUsernameChange={ this.onUsernameChange.bind(this) }
                    onPasswordChange={ this.onPasswordChange.bind(this) }
                    username={ this.state.username }
                    password={ this.state.password }
                    logIn={ this.logIn.bind(this) }
                  />
              }
              
              
            </Column>
            
          </Frame>
        </Panel>
      </Column>  
    );
  }
}

LoginScreen.propTypes = {
  actions: PropTypes.object,
  user: PropTypes.object
};

LoginScreen.defaultProps = {
  actions: {},
  user: {}
};


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, UserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
