import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loading, Project } from 'arwes';

import _ from 'lodash';

import * as UserActions from '../../actions/user';
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import Panel from '../../Components/Panel';
import LoggedInOnly from '../../Components/LoggedInOnly';

import styles from './styles.scss';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const username = _.get(this.props.user, 'credentials.username');
    if (!_.isNil(username)) {
      this.props.actions.getUser(
        username,
        _.get(this.props.user, 'credentials.token')
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    const username = _.get(nextProps.user, 'credentials.username');
    const user = _.get(nextProps.user, `users[${username}]`);
    const heroes = _.get(user, 'heroes');
    if (username && user && user.id && !heroes) {
      nextProps.actions.getUserHeroes(username, user.id);
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
      <Column grow={1} className={styles.user_profile}>
        <Panel className={styles.user_profile_panel}>
          {
            _.get(data, 'loading') &&
              <Loading animate />
          }

          {
            _.get(data, 'username') &&
                  <Project animate header='Profile'>
                      <Row className={styles.user_profile_row}>
                      <label>Username:</label>
                      {data.username}
                    </Row>
                    <Row className={styles.user_profile_row}>
                      <label>Display name:</label>
                      {data.displayName}
                    </Row>
                    <Row className={styles.user_profile_row}>
                      <label>Email:</label>
                      {data.email}
                    </Row>
                  </Project>
          }
        </Panel>
      </Column>
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
