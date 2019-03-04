import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loading, Project } from 'arwes';

import _ from 'lodash';

import * as UserActions from '../../actions/user';
import Column from '../../Components/Column';
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
        <Panel>
          {
            _.get(data, 'loading') &&
            <Loading animate />
          }

          {
            data.username &&
              <Project animate header='Profile'>
                {data.username}
                {data.displayName}
                {data.email}
                {data.role}
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
