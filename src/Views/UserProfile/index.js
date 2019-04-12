import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Divider,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';

import _ from 'lodash';

import * as UserActions from '../../actions/user';
import LoggedInOnly from '../../Components/LoggedInOnly';

import styles from './styles.scss';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const username = _.get(this.props.user, 'credentials.username');
    if (!_.isNil(username)) {
      this.props.actions.getUser(
        username,
        _.get(this.props.user, 'credentials.token')
      );
    }
  }

  render() {
    const {
      user
    } = this.props;

    if (_.isNil(user.credentials)) {
      return <LoggedInOnly />;
    }

    const username = _.get(this.props.user, 'credentials.username');
    const data = _.get(user, `users[${username}]`);

    return (
      <Grid
        centered
        padded
        className={styles.user_profile}
      >
        <Grid.Column>
          <Grid.Row centered>
            <Segment inverted loading={ _.get(data, 'loading') }>
              <Header>
                Your profile
              </Header>
              <Divider />
              <Grid>
                {
                  _.get(data, 'username') &&
                <Grid.Column>
                  <Grid.Row className={styles.user_profile_row}>
                    <label>Username:</label>
                    { data.username }
                  </Grid.Row>
                  <Grid.Row className={styles.user_profile_row}>
                    <label>Display name:</label>
                    { data.displayName }
                  </Grid.Row>
                  <Grid.Row className={styles.user_profile_row}>
                    <label>Email:</label>
                    { data.email }
                  </Grid.Row>
                </Grid.Column>
                }
              </Grid>
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

UserProfile.propTypes = {
  actions: PropTypes.object,
  user: PropTypes.object
};

UserProfile.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
