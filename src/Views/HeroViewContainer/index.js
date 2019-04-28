import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
      match,
      heroActions
    } = this.props;

    if(_.isNil(_.get(heroes), match.params.heroId)) {
      heroActions.getHero(match.params.heroId);
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
  heroActions: PropTypes.shape({
    getHero: PropTypes.func
  }),
  match: PropTypes.object
};

HeroViewContainer.defaultProps = {
  heroes: {},
  heroActions: {},
  match: {}
};

function mapStateToProps(state) {
  return {
    heroes: state.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    heroActions: bindActionCreators(HeroActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroViewContainer);
