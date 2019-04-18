import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as UserActions from '../../actions/user';
import CreateHeroForm from '../../Components/CreateHeroForm';

class CreateHeroFormView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.definitionsActions.getDefinitions();
  }

  render() {
    const {
      definitions
    } = this.props;
  
    return (
      <CreateHeroForm
        definitions={ definitions }
      />
    );
  }
}

CreateHeroFormView.propTypes = {
  userActions: PropTypes.object,
  definitionsActions: PropTypes.object,
  user: PropTypes.object,
  definitions: PropTypes.object
};

CreateHeroFormView.defaultProps = {
  userActions: {},
  definitionsActions: {},
  user: {},
  definitions: {}
};

function mapStateToProps(state) {
  return {
    user: state.user,
    definitions: state.definitions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    definitionsActions: bindActionCreators(DefinitionsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateHeroFormView);
