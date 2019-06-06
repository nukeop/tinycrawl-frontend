import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as HeroActions from '../../actions/heroes';
import * as UserActions from '../../actions/user';

import HeroView from '../../Components/HeroView';

class HeroViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      definitions,
      heroActions,
      userActions,
      definitionsActions
    } = this.props;

    const username = _.get(this.props.user, 'credentials.username');
    
    if (!_.isNil(username)) {
      userActions.getUser(
        username,
        _.get(this.props.user, 'credentials.token')
      )
        .then(userData => {
          return heroActions.getHeroesByUserId(userData.id);
        })
        .then(heroesData => {
          return Promise.all(
            _.map(heroesData, hero => {
              return heroActions.getHero(hero._id);
            })
          );
        });
    }
    
    if(_.isEmpty(definitions)) {
      definitionsActions.getDefinitions();
    }
  }
  
  render(){
    const {
      user,
      heroes,
      heroActions,
      match
    } = this.props;

    const token = _.get(user, 'credentials.token');
    
    return (
      <HeroView
        loading={ _.get(heroes, 'loading') }
        hero={ _.get(heroes, match.params.heroId) }
        heroes={ _.omit(heroes, 'loading') }
        deleteHero={ () => heroActions.deleteHero(match.params.heroId, token) }
      />
    );
  }
}

HeroViewContainer.propTypes = {
  user: PropTypes.shape({
    credentials: PropTypes.shape({
      token: PropTypes.string
    })
  }),
  heroes: PropTypes.shape({
    loading: PropTypes.boolean,
    heroes: PropTypes.array
  }),
  definitions: PropTypes.object,
  heroActions: PropTypes.shape({
    getHero: PropTypes.func,
    deleteHero: PropTypes.func
  }),
  userActions: PropTypes.shape({
    getUser: PropTypes.func
  }),
  definitionsActions: PropTypes.shape({
    getDefinitions: PropTypes.func
  }),
  match: PropTypes.object
};

HeroViewContainer.defaultProps = {
  user: {},
  heroes: {},
  definitions: {},
  heroActions: {},
  definitionsActions: {},
  match: {}
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

export default connect(mapStateToProps, mapDispatchToProps)(HeroViewContainer);
