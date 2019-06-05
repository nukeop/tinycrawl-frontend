import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Label,
  List,
  Segment
} from 'semantic-ui-react';

import styles from './styles.scss';

const traitsToListItems = (traits, selectedTrait, traitPoints, onSelect) => _.map(traits, t => {
  return (
    <List.Item
      className={cx({ 'unavailable': t.points > traitPoints })}
      active={ t.name === _.get(selectedTrait, 'name') }
      onClick={ () => onSelect(t) }
    >
      { t.prettyName }
    </List.Item>
  );
});

class HeroTraitsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrait: null,
      loading: false
    };
  }

  handleBuyTrait(traitId) {
    const { hero, buyTrait } = this.props;

    this.setState({ loading: true });
    buyTrait(hero.id, traitId)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  hasTrait(trait, hero) {
    return _.find(_.get(hero, 'traits'), { name: _.get(trait,  'name') });
  }

  hasTraitName(name, hero) {
    return _.find(_.get(hero, 'traits'), { name });
  }

  hasPrerequisiteTraits(trait, hero) {
    return _.every(_.map(_.get(trait, 'prerequisites'), prereq => this.hasTraitName(prereq, hero)));
  }

  canBuyTrait(trait, hero) {
    return _.get(trait, 'points') <= _.get(hero, 'traitPoints') &&
      !this.hasTrait(trait, hero) &&
      this.hasPrerequisiteTraits(trait, hero);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps, this.props)) {
      const sortedTraits = _.sortBy(
        this.props.definitions.traits,
        'prettyName'
      );
      this.setState({
        selectedTrait: _.head(sortedTraits)
      });
    }
  }
  
  render() {
    const {
      loading,
      hero,
      definitions,
      match
    } = this.props;

    const goBackPath = match.url.split('/').slice(0, -1).join('/');
    const groupedTraits = _(definitions.traits).partition(t => t.points >= 0).map(group => _.sortBy(group, 'prettyName')).value();
    const onSelect = selectedTrait => this.setState({ selectedTrait });
  
    return (
      <Grid
        centered
        padded
        className={styles.hero_traits_view}
      >
        <Grid.Row centered>
          <Grid.Column>
            <Container text>
              <Segment inverted loading={ loading }>
                <Grid.Row className={styles.header_row}>
                  <Header inverted as='h1'>
                    { hero.name }
                    <Header.Subheader>
                      { _.get(hero, 'heroClass.prettyName') }
                    </Header.Subheader>
                  </Header>
                </Grid.Row>
                <Divider inverted />
                <Grid.Row>
                  <Button
                    inverted
                    basic
                    icon='chevron left'
                    as={ Link }
                    to={ goBackPath }
                  />
                </Grid.Row>
                <Divider inverted />
                <Grid.Row>
                  <Header inverted as='h4'>
                    Points left: { _.get(hero, 'traitPoints') }
                  </Header>
                </Grid.Row>
                <Divider inverted />
                {
                  !loading &&
                  <Grid>
                    <Grid.Row columns={ 2 }>
                      {
                        _.map(groupedTraits, group => {
                          return (
                            <Grid.Column width={ 4 }>
                              <List
                                link
                                inverted
                                className={styles.traits_list}
                              >
                                {
                                  traitsToListItems(
                                    group,
                                    this.state.selectedTrait,
                                    _.get(hero, 'traitPoints'),
                                    onSelect
                                  ) }
                              </List>
                            </Grid.Column>
                          );
                        })
                      }
                    </Grid.Row>
                  </Grid>
                }
                <Divider inverted/>
                <Grid.Row padded className={styles.selected_trait_header}>
                  <Header inverted as='h4'>
                    { _.get(this.state.selectedTrait, 'prettyName') }

                    <Label
                      color={ _.get(this.state.selectedTrait, 'points') >= 0 ? 'green' : 'red'}
                    >
                      Costs { _.get(this.state.selectedTrait, 'points') } points
                    </Label>
                  </Header>
                  
                </Grid.Row>
                <Grid.Row>
                  { _.get(this.state.selectedTrait, 'description') }
                </Grid.Row>
                
                <Grid.Row className={styles.purchase_button_row}>
                  {
                    this.canBuyTrait(this.state.selectedTrait, hero) &&
                      <Button
                        primary
                        onClick={ () =>
                          this.handleBuyTrait.bind(this)(
                            _.get(this.state.selectedTrait, 'id')) }
                        loading={ this.state.loading }
                      >
                        Buy
                      </Button>
                  }
                  {
                    this.hasTrait(this.state.selectedTrait, hero) &&
                    <Label color='blue'>
                      Trait already owned
                    </Label>
                  }
                </Grid.Row>

                
              </Segment>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

HeroTraitsView.propTypes = {
  loading: PropTypes.bool,
  hero: PropTypes.shape({
    name: PropTypes.string
  }),
  definitions: PropTypes.object,
  buyTrait: PropTypes.func,
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

HeroTraitsView.defaultProps = {
  loading: false,
  hero: {},
  definitions: {},
  buyTrait: () => {},
  match: {}
};

export default withRouter(HeroTraitsView);
