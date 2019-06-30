import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
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
      definitions,
      definitionsActions,
      user,
      userActions,
      heroActions,
    } = this.props;
    
    const username = _.get(user, 'credentials.username');

    if(_.isEmpty(definitions)) {
      definitionsActions.getDefinitions();
    }
    
    if (!_.isNil(username)) {
      userActions.getUser(
        username,
        _.get(user, 'credentials.token')
      )
        .then(userData => {
          heroActions.getHeroesByUserId(userData.id);
        });
    }
  }

  render() {
    const {
      user,
      heroes,
      definitions
    } = this.props;

    if (_.isNil(user.credentials)) {
      return <LoggedInOnly />;
    }

    const username = _.get(user, 'credentials.username');
    const currentUser = _.get(user, `users[${username}]`);
    const heroesList = _.filter(
      heroes,
      { user: _.get(currentUser, 'id') }
    );
    const loading = _.get(definitions, 'loading') || _.get(heroes, 'loading');
    
    return (
      <HeroList
        heroes={ heroesList }
        definitions={ definitions }
        loading= { loading }
      />
    );
  }
}

HeroesOverview.propTypes = {
  user: PropTypes.object,
  heroes: PropTypes.object,
  definitions: PropTypes.object,
  userActions: PropTypes.shape({
    getUser: PropTypes.func
  }),
  heroActions: PropTypes.shape({
    getHeroesByUserId: PropTypes.func
  }),
  definitionsActions: PropTypes.shape({
    getDefinitions: PropTypes.func
  })
};

HeroesOverview.defaultProps = {
  user: {},
  heroes: {},
  definitions: {},
  userActions: {},
  heroActions: {},
  definitionsActions: {}
};

function mapStateToProps(state) {
  return {
    user: state.user,
    heroes: state.heroes,
    definitions: state.definitions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    definitionsActions: bindActionCreators(DefinitionsActions, dispatch),
    heroActions: bindActionCreators(HeroActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroesOverview);
