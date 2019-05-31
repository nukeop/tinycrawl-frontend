import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as DefinitionsActions from '../../actions/definitions';
import * as HeroActions from '../../actions/heroes';
import * as UserActions from '../../actions/user';
import { notify } from '../../actions/notifications';
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
    if(_.isEmpty(this.props.definitions)) {
      this.props.definitionsActions.getDefinitions()
        .then(() => {
          this.setState({
            selectedClass: _.head(this.props.definitions.heroclasses)
          });
        });
    }
  }

  setName(name) {
    this.setState({ name });
  }

  setSelectedClass(heroClass){
    this.setState({ selectedClass: heroClass});
  }

  createHero() {
    const token = _.get(this.props.user, 'credentials.token');
    return this.props.heroActions.createHero(token)({
      heroClass: this.state.selectedClass.name,
      name: this.state.name
    });
  }

  render() {
    const {
      definitions,
      notify
    } = this.props;
  
    return (
      <CreateHeroForm
        definitions={ definitions }
        selectedClass={ this.state.selectedClass }
        setSelectedClass={ this.setSelectedClass.bind(this) }
        setName={ this.setName.bind(this) }
        createHero={ this.createHero.bind(this) }
        notify={ notify }
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
  notify: PropTypes.func,
  user: PropTypes.object,
  definitions: PropTypes.object
};

CreateHeroFormView.defaultProps = {
  userActions: {},
  definitionsActions: {},
  notify: () => {},
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
    heroActions: bindActionCreators(HeroActions, dispatch),
    notify: bindActionCreators(notify, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateHeroFormView);
