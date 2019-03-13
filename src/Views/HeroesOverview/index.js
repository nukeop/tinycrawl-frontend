import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../../actions/user';
import Column from '../../Components/Column';
import _ from 'lodash';

import LoggedInOnly from '../../Components/LoggedInOnly';

import styles from './styles.scss';

class HeroesOverview extends React.Component {
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

    const username = _.get(user, 'credentials.username');
    const currentUser = _.get(user, `users[${username}]`);
    
    return (
      <Column className={styles.heroes_overview}>
        {
          _.map(_.get(currentUser, 'heroes'), hero => {
            return (
              <div>
                { hero.name }
              </div>
            );
          })
        }
      </Column>
    );
  }
}

HeroesOverview.propTypes = {

};

HeroesOverview.defaultProps = {

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

export default connect(mapStateToProps, mapDispatchToProps)(HeroesOverview);
