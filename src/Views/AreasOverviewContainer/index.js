import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AreasActions from '../../actions/areas';
import * as DefinitionsActions from '../../actions/definitions';
import * as UserActions from '../../actions/user';

import AreasOverview from '../../Components/AreasOverview';

class AreasOverviewContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      definitions,
      definitionsActions,
      user,
      userActions
    } = this.props;

    const username = _.get(user, 'credentials.username');
    userActions.getUserAreas(username);

    if(_.isEmpty(definitions)) {
      definitionsActions.getDefinitions();
    }
  }

  render() {
    const {
      definitions,
      user,
      areasActions
    } = this.props;
    
    const username = _.get(user, 'credentials.username');
    const currentUser = _.get(user, `users[${username}]`);
    const token = _.get(user, 'credentials.token');
    
    return (
      <AreasOverview
        areas={ _.get(currentUser, 'areas') }
        environments={ _.get(definitions, 'environments') }
        environmentalFeatures={ _.get(definitions, 'environmentalfeatures') }
        discover={ () => areasActions.discoverArea(token) }
      />
    );
  }
}

AreasOverviewContainer.propTypes = {
  user: PropTypes.shape({
    credentials: PropTypes.shape({
      username: PropTypes.string
    }),
    areas: PropTypes.object
  }),
  userActions: PropTypes.shape({
    getUserAreas: PropTypes.func
  }),
  definitions: PropTypes.shape({
    environments: PropTypes.object,
    environmentalFeatures: PropTypes.object
  }),
  definitionsActions: PropTypes.shape({
    getDefinitions: PropTypes.func
  }),
  areas: PropTypes.shape({}),
  areasActions: PropTypes.shape({
    discoverArea: PropTypes.func
  })
};

AreasOverviewContainer.defaultProps = {
  user: {},
  userActions: {},
  definitions: {},
  definitionsActions: {},
  areas: {},
  areasActions: {}
};

function mapStateToProps(state) {
  return {
    user: state.user,
    definitions: state.definitions,
    areas: state.areas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    definitionsActions: bindActionCreators(DefinitionsActions, dispatch),
    areasActions: bindActionCreators(AreasActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AreasOverviewContainer);
