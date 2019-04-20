import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as UserActions from '../../actions/user';
import CreateHeroForm from '../../Components/CreateHeroForm';

class CreateHeroFormView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedClass: null
    };
  }

  componentDidMount() {
    this.props.definitionsActions.getDefinitions()
      .then(() => {
        this.setState({
          selectedClass: _.head(this.props.definitions.heroclasses)
        });
      });
  }

  setSelectedClass(heroClass){
    this.setState({ selectedClass: heroClass});
  }

  render() {
    const {
      definitions
    } = this.props;
  
    return (
      <CreateHeroForm
        definitions={ definitions }
        selectedClass={ this.state.selectedClass }
        setSelectedClass={ this.setSelectedClass.bind(this) }
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
