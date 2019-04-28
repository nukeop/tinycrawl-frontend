import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as HeroActions from '../../actions/heroes';

import HeroView from '../../Components/HeroView';

const HeroViewContainer = props => {
  const {
    user,
    heroes,
    heroId
  } = props;

  const username = _.get(user, 'credentials.username');
  const currentUser = _.get(user, `users[${username}]`);
  const heroesList = _.get(heroes, _.get(currentUser, 'id'));
  
  return (
    <HeroView
      loading={ _.get(heroes, 'loading') }
      hero={ _.find(_.get(heroesList, 'heroes'), { _id: heroId }) }
      />
  );
};

HeroViewContainer.propTypes = {
  heroes: PropTypes.shape({
    loading: PropTypes.boolean,
    heroes: PropTypes.array
  }),
  heroId: PropTypes.string
};

HeroViewContainer.defaultProps = {
  heroes: {},
  heroId: ''
};

function mapStateToProps(state) {
  return {
    heroes: state.heroes,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    heroActions: bindActionCreators(HeroActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroViewContainer);
