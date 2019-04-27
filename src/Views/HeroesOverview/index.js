import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as HeroActions from '../../actions/heroes';
import * as UserActions from '../../actions/user';
import _ from 'lodash';

import LoggedInOnly from '../../Components/LoggedInOnly';
import HeroList from '../../Components/HeroList';

class HeroesOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      userActions,
      heroActions,
    } = this.props;
    
    const username = _.get(this.props.user, 'credentials.username');
    if (!_.isNil(username)) {
      userActions.getUser(
        username,
        _.get(this.props.user, 'credentials.token')
      )
        .then(userData => {
          heroActions.getHeroesByUserId(userData.id);
        });
    }
  }

  render() {
    const {
      user,
      heroes
    } = this.props;

    if (_.isNil(user.credentials)) {
      return <LoggedInOnly />;
    }

    const username = _.get(user, 'credentials.username');
    const currentUser = _.get(user, `users[${username}]`);
    
    return (
      <HeroList
        heroes={_.get(heroes, _.get(currentUser, 'id'))}
      />
    );
  }
}

HeroesOverview.propTypes = {
  user: PropTypes.object,
  heroes: PropTypes.object,
  userActions: PropTypes.shape({
    getUser: PropTypes.func
  }),
  heroActions: PropTypes.shape({
    getHeroesByUserId: PropTypes.func
  })
};

HeroesOverview.defaultProps = {
  user: {},
  heroes: {},
  userActions: {},
  heroActions: {}
};

function mapStateToProps(state) {
  return {
    user: state.user,
    heroes: state.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    heroActions: bindActionCreators(HeroActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroesOverview);
