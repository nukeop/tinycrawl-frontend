import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Heading } from 'arwes';
import _ from 'lodash';

import * as NotesActions from '../../actions/notes';
import Column from '../../Components/Column';

const NotesForm = props => {
  return (
    <Column narrow>
      <Heading node='h2'>
        Notes
      </Heading>

      <select>
        {
          _.map(props.parts.structures, s => {
            return (
              <option key={s._id} value={s._id}>
                {s.structure}
              </option>
            );})
        }
      </select>

      <select>
        {
          _.map(props.parts.phrases, p => {
            return (
              <option key={p._id} value={p._id}>
                {p.singular}
              </option>
            );})
        }
    </select>

    <select>
        {
          _.map(props.parts.conjunctions, c => {
            return (
              <option key={c._id} value={c._id}>
                {c.conjunction}
              </option>
            );})
        }
      </select>

    
    </Column>
  );
};

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
        <NotesForm
          parts={this.props.notes.parts}
        />
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
