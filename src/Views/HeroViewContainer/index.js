import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as HeroActions from '../../actions/heroes';

import HeroView from '../../Components/HeroView';

class HeroViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      user,
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
  
  render(){
    const {
      heroes,
      match
    } = this.props;
    
    return (
      <HeroView
        loading={ _.get(heroes, 'loading') }
        hero={ _.get(heroes, match.params.heroId) }
      />
    );
  }
}

HeroViewContainer.propTypes = {
  heroes: PropTypes.shape({
    loading: PropTypes.boolean,
    heroes: PropTypes.array
  }),
  definitions: PropTypes.object,
  heroActions: PropTypes.shape({
    getHero: PropTypes.func
  }),
  definitionsActions: PropTypes.shape({
    getDefinitions: PropTypes.func
  }),
  match: PropTypes.object
};

HeroViewContainer.defaultProps = {
  heroes: {},
  definitions: {},
  heroActions: {},
  definitionsActions: {},
  match: {}
};

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(HeroViewContainer);
