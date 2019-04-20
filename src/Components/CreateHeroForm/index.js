import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
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
              <Grid.Row divided columns={2}>
                <Grid.Column>
                  <Form inverted>
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
                    <Form.Field>
                      <label>Name</label>
                      <Input
                        inverted
                        fluid
                        placeholder='Name...'
                      />
                    </Form.Field>
                  </Form>
                </Grid.Column>
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
                </Grid.Column>
              </Grid.Row>
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
