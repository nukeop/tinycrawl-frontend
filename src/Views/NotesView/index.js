import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as NotesActions from '../../actions/notes';
import Column from '../../Components/Column';

class NotesView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getNotesParts();
  }

  render() {
    return (
      <Column>

      </Column>
    );
  }
}

NotesView.propTypes = {
  actions: PropTypes.object,
  notes: PropTypes.object
};

NotesView.defaultProps = {
  actions: {},
  notes: {}
};

function mapStateToProps(state) {
  return {
    notes: state.notes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, NotesActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesView);
