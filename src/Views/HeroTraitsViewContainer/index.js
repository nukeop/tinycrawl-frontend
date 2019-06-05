import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as HeroActions from '../../actions/heroes';

import HeroTraitsView from '../../Components/HeroTraitsView';

class HeroTraitsViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      heroes,
      definitions,
      match,
      heroActions,
      definitionsActions
    } = this.props;

    if(_.isNil(_.get(heroes), match.params.heroId)) {
      heroActions.getHero(match.params.heroId);
    }

    if(_.isEmpty(definitions)) {
      definitionsActions.getDefinitions();
    }
  }
  
  render() {
    const {
      user,
      heroes,
      heroActions,
      definitions,
      match
    } = this.props;

    const token = _.get(user, 'credentials.token');
  
    return (
      <HeroTraitsView
        loading={ _.get(heroes, 'loading') }
        hero={ _.get(heroes, match.params.heroId) }
        definitions={ definitions }
        buyTrait={ heroActions.buyTrait(token) }
      />
    );
  }
}

HeroTraitsViewContainer.propTypes = {
  user: PropTypes.shape({
    credentials: PropTypes.shape({
      token: PropTypes.string
    })
  }),
  heroes: PropTypes.shape({
    loading: PropTypes.boolean,
    heroes: PropTypes.array
  }),
  heroActions: PropTypes.shape({
    getHero: PropTypes.func,
    buyTrait: PropTypes.func
  }),
  definitions: PropTypes.object,
  definitionsActions: PropTypes.shape({
    getDefinitions: PropTypes.func
  }),
  match: PropTypes.object
};

HeroTraitsViewContainer.defaultProps = {
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
    heroActions: bindActionCreators(HeroActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroTraitsViewContainer);
