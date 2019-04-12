import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import _ from 'lodash';
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';

import * as NotesActions from '../../actions/notes';

import styles from './styles.scss';

const getCategories = phrases => {
  return _.uniq(_.map(phrases, p => _.get(p, 'category')));
};

const NotesForm = props => {
  const categories = getCategories(props.parts.phrases);
  const renderableTemplates = _.map(
    props.parts.structures,
    template => {
      return {
        key: template.id,
        value: template.name,
        text: template.structure.replace(/{}/g, '****')
      };
    });

  const renderableConjunctions = _.map(
    props.parts.conjunctions,
    conjunction => {
      return {
        key: conjunction.id,
        value: conjunction.name,
        text: conjunction.conjunction
      };
    }
  );
  
  return (
    <Grid
      centered
      padded
      className={styles.notes_form}
    >
      <Grid.Column>
        <Grid.Row centered>
          <Container>
            <Segment inverted>
              <Header inverted>
                Notes
              </Header>
              <Grid
                centered
                padded
                className={styles.notes_grid}
              >
                <Grid.Column>
                  <Grid.Row textAlign='center'>
                    <Segment inverted attached='top' textAlign='center'>
                      { props.note }
                    </Segment>
                  </Grid.Row>
                  <Grid.Row>
                    <Segment inverted attached='bottom'>
                      <Grid
                        centered
                        padded
                        divided
                        columns={3}
                        className={styles.notes_parts_grid}
                      >
                        <Grid.Column className={styles.notes_parts_column}>
                          <Grid.Row>
                            <Header inverted as='h4'>
                              Templates
                            </Header>
                          </Grid.Row>
                          {
                            _.map(props.selectedStructures, (structure, i) => {
                              return(
                                <Grid.Row>
                                  <Dropdown
                                    fluid
                                    search
                                    selection
                                    options={ renderableTemplates }
                                    onChange={(e, data) => {
                                      props.selectStructure(
                                        _.find(props.parts.structures, { name: data.value }),
                                        i
                                      );
                                    }}
                                    value={  _.get(props, `selectedStructures[${i}].name`) } 
                                  />
                                </Grid.Row>
                              );

                            })  
                          }

                          {
                            props.selectedStructures.length > 1 &&
        <Grid.Row>
          <Dropdown
            fluid
            search
            selection
            options={ renderableConjunctions }
            onChange={(e, data) => {
              props.selectConjunction(_.find(props.parts.conjunctions, { name: data.value }));
            }}
            value={ _.get(props, 'selectedConjunction') }
          />
        </Grid.Row>
                          }
                        </Grid.Column>
                        <Grid.Column
                          className={styles.notes_parts_column}>
                          {
                            _.map(categories, c => {
                              return (
                                <React.Fragment>
                                  <Grid.Row textAlign='center'> 
                                    <a
                                      href='#'
                                      onClick={ () => {
                                        props.selectCategory(c);
                                        props.selectPhrase(null);
                                      }}
                                      className={
                                        cx(
                                          styles.category,
                                          { selected: c === props.selectedCategory }
                                        )
                                      }
                                    >
                                      { _.capitalize(c) }
                                    </a>
                                  </Grid.Row>
                                  <Divider />
                                </React.Fragment>
                              );
                            })
                          }
                        </Grid.Column>
                        <Grid.Column
                          className={styles.notes_parts_column}>
                          {
                            _.map(
                              _.filter(props.parts.phrases, phrase => phrase.category === props.selectedCategory),
                              p => {
                                return (
                                  <React.Fragment>
                                    <Grid.Row textAlign='center'>
                                      <a
                                        href='#'
                                        key={ p._id }
                                        onClick={ () =>
                                          props.selectPhrase(p) }
                                        className={
                                          cx(
                                            styles.phrase,
                                            { selected: _.isEqual(p, props.selectedPhrase) }
                                          )
                                        }
                                      >
                                        { _.capitalize(p.singular) }
                                      </a>
                                    </Grid.Row>
                                    <Divider />
                                  </React.Fragment>
                                );
                              }
                            )
                          }
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  </Grid.Row>
                  <Grid.Row className={styles.format_controls_row}>
                    <Button icon onClick={ props.changeFormat }>
                      <Icon name='arrow left'/>
                    </Button>
                    <span>Change note format</span>
                    <Button icon onClick={ props.changeFormat }>
                      <Icon name='arrow right'/>
                    </Button>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
      
            </Segment> 
          </Container>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

class NotesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStructures: [null],
      selectedCategory: null,
      selectedPhrase: null,
      selectedConjunction: null,
      note: ''
    };
  }

  setSelectedStructure(struct, index) {
    let newSelectedStructures = this.state.selectedStructures;
    newSelectedStructures[index] = struct;
    this.setState({
      selectedStructures: newSelectedStructures
    }, () => this.updateNote());
  }
  
  setSelectedCategory(category) {
    this.setState({ selectedCategory: category });
  }

  setSelectedPhrase(phrase) {
    this.setState({ selectedPhrase: phrase }, () => this.updateNote());
  }

  setSelectedConjunction(conjunction) {
    this.setState({ selectedConjunction: conjunction }, () => this.updateNote());
  }

  changeFormat() {
    let newSelectedStructures = this.state.selectedStructures;
    if (this.state.selectedStructures.length < 2) {
      newSelectedStructures[1] = null;
    } else {
      newSelectedStructures = [_.head(newSelectedStructures)];
    }
    this.setState({ selectedStructures: newSelectedStructures });
  }

  componentDidMount() {
    this.props.actions.getNotesParts();
  }

  updateNote() {
    if(this.state.selectedStructures.length > 0 &&
       !_.isEmpty(this.state.selectedPhrase)
    ) {
      let note = _.map(this.state.selectedStructures, (structure, i) => {
        return i > 0
          ? _.get(this.state, 'selectedConjunction.conjunction') + structure.structure
          : structure.structure; 
      });
      note = note.join(' ');

      let numbers = _.reduce(
        this.state.selectedStructures,
        (all, current) => {
          return _.concat(all, current.numbers);
        }, []);
      
      let properNumbers = _.map(numbers, number => {
        return this.state.selectedPhrase[_.lowerCase(number)];
      });
      _.forEach(properNumbers, number => {
        note = note.replace('{}', number);
      });
      this.setState({ note });
    }
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
        note={ this.state.note }
        parts={this.props.notes.parts}
        selectedStructures={this.state.selectedStructures}
        selectedCategory={this.state.selectedCategory}
        selectedPhrase={this.state.selectedPhrase}
        selectStructure={this.setSelectedStructure.bind(this)}
        selectCategory={this.setSelectedCategory.bind(this)}
        selectPhrase={this.setSelectedPhrase.bind(this)}
        selectConjunction={this.setSelectedConjunction.bind(this)}
        changeFormat={ this.changeFormat.bind(this) }
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
