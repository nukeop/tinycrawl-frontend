import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Segment
} from 'semantic-ui-react';

import EquipmentSlot from './EquipmentSlot';

import styles from './styles.scss';

const classToOption = heroClass => {
  return {
    key: heroClass.id,
    text: heroClass.prettyName,
    value: heroClass.name
  };
};

const HeroStatsLine = props => {
  const { name, value } = props;
  return (
    <div className={ styles.hero_stats_line }>
      <div className={ styles.hero_stats_name }>
        { name }:
      </div>
      <div className={ styles.hero_stats_value }>
        { value }
      </div>
    </div>
  );
};

HeroStatsLine.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number
};

const CreateHeroForm = props => {
  const {
    definitions,
    selectedClass,
    setSelectedClass
  } = props;
  
  return (
    <Grid
      centered
      padded
      className={ styles.create_hero_form }
    >
      <Grid.Row centered>
     
        <Grid.Column>
          <Container text>
            <Segment inverted loading={ _.get(definitions, 'loading') }>
              <Header inverted>
              Create a hero
              </Header>
              <Divider />
              <Form inverted as={ Grid.Row } divided columns={ 2 }>
                <Grid.Column>
                  <Form.Field>
                    <label>Class</label>
                    <Dropdown
                      selection
                      fluid
                      options={
                        _.map(definitions.heroclasses, classToOption)
                      }
                      value={ _.get(selectedClass, 'name') }
                      onChange={ (e, item) => setSelectedClass(
                        _.find( definitions.heroclasses, { name: item.value })
                      ) }
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label>Name</label>
                    <Input
                      inverted
                      fluid
                      placeholder='Name...'
                    />
                  </Form.Field>
                </Grid.Column>
              </Form>

              <Divider />
              
              <Grid.Column>
                <Header inverted as='h3'>
                    Starting attributes
                </Header>
                <HeroStatsLine
                  name='HP'
                  value={ _.get(selectedClass, 'baseHp') }
                />
                <HeroStatsLine
                  name='Attack'
                  value={ _.get(selectedClass, 'baseAttack') }
                />
                <HeroStatsLine
                  name='Defense'
                  value={ _.get(selectedClass, 'baseDefense') }
                />
                <Divider />
                <Header inverted as='h3'>
                    Slots
                </Header>
                <Label.Group color='blue'>
                  {
                    _.map(
                      _.get(selectedClass, 'slots'), slot => {
                        const slotObj = _.get(
                          _.find(
                            _.get(definitions, 'equipmentslots'),
                            { id: slot }
                          ), 'name');
                        
                        return (
                          <EquipmentSlot
                            slot={ slotObj }
                          />
                        );
                      })
                  }
                </Label.Group>
                <Divider />
                <Header inverted as='h3'>
                    Abilities
                </Header>
                {
                  _.map(
                    _.get(selectedClass, 'abilities'), ability => {
                      const abilityDef = _.find(
                        _.get(definitions, 'abilities'),
                        { id: ability }
                      );
                      return (
                        <Header inverted as='h4'>
                          { _.get(abilityDef, 'prettyName') }
                          <Header.Subheader>
                            { _.get(abilityDef, 'description') }
                          </Header.Subheader>
                        </Header>
                      );
                    }
                  )
                }
                <Divider />
    
                <Header inverted as='h3'>
                    Moves
                </Header>
                {
                  _.map(
                    _.get(selectedClass, 'moves'), move => {
                      const moveDef = _.find(
                        _.get(definitions, 'moves'),
                        { id: move }
                      );
                      return (
                        <Header inverted as='h4' className={ styles.hero_class_move }>
                          { _.get(moveDef, 'prettyName') }
                          <Header.Subheader>
                            { _.get(moveDef, 'description') }
                          </Header.Subheader>
                        </Header>
                              
                      );
                    })
                }
              </Grid.Column>
              <Divider />
              <Button  primary>
                Create
              </Button>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

CreateHeroForm.propTypes = {
  definitions: PropTypes.object,
  selectedClass: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    prettyName: PropTypes.string
  }),
  setSelectedClass: PropTypes.func
};

CreateHeroForm.defaultProps = {
  definitions: {},
  selectedClass: {},
  setSelectedClass: () => {}
};

export default CreateHeroForm;
