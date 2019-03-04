import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Heading, Frame, Words } from 'arwes';
import cx from 'classnames';
import _ from 'lodash';

import * as NotesActions from '../../actions/notes';
import Column from '../../Components/Column';
import Row from '../../Components/Row';

import styles from './styles.scss';

const getCategories = phrases => {
  return _.uniq(_.map(phrases, p => _.get(p, 'category')));
};

const NotesForm = props => {
  const categories = getCategories(props.parts.phrases);
  return (
    <Column narrow className={styles.notes_form}>
      <Heading node='h2'>
        Notes
      </Heading>

      <Frame corners={2} className={styles.note_frame}>
        <Words>{ props.note }</Words>
      </Frame>

      <Row grow={1}>
        <Frame className={styles.structures}>
          <select>
            {
              _.map(props.parts.structures, s => {
                return (
                  <option
                    key={s._id}
                    className={styles.structure}
                    onClick={ () => {} }
                  >
                    { _.replace(s.structure, '{}', '****') }
                  </option>
                );})
            }
          </select>
        </Frame>
        <Frame className={styles.categories}>
          {
            _.map(categories, c => {
              return (
                <a
                  key={c}
                  href='javascript:void(0)'
                  className={
                    cx(
                      styles.category,
                      { selected: c === props.selectedCategory }
                    )
                  }
                  onClick={ () => props.selectCategory(c) }
                >
                  {c}
                </a>
              );})
          }
        </Frame>
        <Frame className={styles.phrases}>
          {
            _.map(
              _.filter(props.parts.phrases, phrase => phrase.category === props.selectedCategory),
              p => {
                return (
                  <a
                    key={p._id}
                    href='javascript:void(0)'
                    className={
                      cx(
                        styles.phrase,
                        { selected: _.isEqual(p, props.selectedPhrase) }
                      )
                    }
                    onClick={ () => props.selectPhrase(p) }
                  >
                    {p.singular}
                  </a>
                );})
          }
        </Frame>
      </Row>
    </Column>
  );
};

class NotesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStructures: [null],
      selectedCategory: null,
      selectedPhrase: null,
      selectedConjunction: null
    };
  }

  setSelectedStructure(struct) {
    this.setState({ selectedStructure: struct });
  }
  
  setSelectedCategory(category) {
    this.setState({ selectedCategory: category });
  }

  setSelectedPhrase(phrase) {
    this.setState({ selectedPhrase: phrase });
  }

  setSelectedConjunction(conjunction) {
    this.setState({ selectedConjunction: conjunction });
  }

  componentWillMount() {
    this.props.actions.getNotesParts();
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.selectedCategory === null && _.get(nextProps, 'notes.parts.phrases')) {
      this.setSelectedCategory(
        _.head(getCategories(nextProps.notes.parts.phrases))
      );
    }
  }

  render() {
    return (
      <NotesForm
        note='test'
        parts={this.props.notes.parts}
        selectedStructure={this.state.selectedStructure}
        selectedCategory={this.state.selectedCategory}
        selectedPhrase={this.state.selectedPhrase}
        selectStructure={this.setSelectedStructure.bind(this)}
        selectCategory={this.setSelectedCategory.bind(this)}
        selectPhrase={this.setSelectedPhrase.bind(this)}
        selectConjunction={this.setSelectedConjunction.bind(this)}
      />
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
