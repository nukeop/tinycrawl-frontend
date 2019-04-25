import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as HeroActions from '../../actions/heroes';
import * as UserActions from '../../actions/user';
import CreateHeroForm from '../../Components/CreateHeroForm';

class CreateHeroFormView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
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

  setName(name) {
    this.setState({ name });
  }

  setSelectedClass(heroClass){
    this.setState({ selectedClass: heroClass});
  }

  createHero() {
    const token = _.get(this.props.user, 'credentials.token');
    this.props.heroActions.createHero({
      heroClass: this.state.selectedClass.id,
      name: this.state.name
    }, token);
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
        setName={ this.setName.bind(this) }
        createHero={ this.createHero.bind(this) }
      />
    );
  }
}

CreateHeroFormView.propTypes = {
  userActions: PropTypes.object,
  definitionsActions: PropTypes.shape({
    getDefinitions: PropTypes.func
  }),
  heroActions: PropTypes.shape({
    createHero: PropTypes.func
  }),
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
    definitionsActions: bindActionCreators(DefinitionsActions, dispatch),
    heroActions: bindActionCreators(HeroActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateHeroFormView);
