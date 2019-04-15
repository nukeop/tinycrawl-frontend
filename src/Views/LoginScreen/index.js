import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Segment
} from 'semantic-ui-react';
import _ from 'lodash';

import OauthPopup from '../../Components/OauthPopup';

import constants from '../../constants';
import * as UserActions from '../../actions/user';

import styles from './styles.scss';

const getGithubOauthUrl = location => {
  return constants.GITHUB_OAUTH_AUTHORIZE_URL +
    '?client_id=' +
    constants.GITHUB_CLIENT_ID +
    '&redirect_uri=' +
    window.location.href;
};

const LoginForm = props => {
  return (
    <React.Fragment>
      <Form size='large' loading={ props.loading } onSubmit={ props.logIn }>
        <Form.Field>
          <Input
            inverted
            icon='user'
            iconPosition='left'
            placeholder='Username'
            onChange={ props.onUsernameChange }
          />
        </Form.Field>
        <Form.Field>
          <Input
            inverted
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={ props.onPasswordChange }
          />
        </Form.Field>
        <Button size='large' primary fluid inverted submit>
            Log in
        </Button>
          
      </Form>
      <Divider horizontal inverted>Or</Divider>
      <OauthPopup
        url={ getGithubOauthUrl() }
        onCode={ code => props.githubOauth(code) } 
        render={ props =>
          <Button size='large' fluid inverted onClick={ props.onClick }>
            <Icon name='github' />
            Log in with Github
          </Button>
        } />
    </React.Fragment>
  );
};

LoginForm.propTypes = {
  loading: PropTypes.bool,
  onUsernameChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  logIn: PropTypes.func
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

    const username = _.get(user, 'credentials.username');
    
    return (
      <Grid
        centered
        verticalAlign='middle'
        padded
        className={styles.log_in_grid}
      >
        <Grid.Column>
          <Grid.Row centered>
            {
              !username &&
                  <Segment inverted>
                    <LoginForm
                      loading={ _.get(user, 'credentials.loading') }
                      onUsernameChange={ this.onUsernameChange.bind(this) }
                      onPasswordChange={ this.onPasswordChange.bind(this) }
                        logIn={ this.logIn.bind(this) }
                        githubOauth={ this.props.actions.githubOauth }
                    />
                  </Segment>
            }

            {
              username &&
                      <Segment inverted>
                        <Header inverted textAlign='center'>Logged in as {username}</Header>
                      </Segment>
            }
          </Grid.Row>
        </Grid.Column>
      </Grid>
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
