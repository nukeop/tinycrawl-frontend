import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Input,
  Label,
  Segment
} from 'semantic-ui-react';

import styles from './styles.scss';

const CreateHeroForm = props => {
  const {
    definitions
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
                  <Input
                    inverted
                    fluid
                    placeholder='Name...'
                    label='Name'
                  />
                  <Dropdown
                    selection
                    fluid
                    options={
                      _.map(definitions.heroclasses, heroClass => {
                        return {
                          key: heroClass.id,
                          text: heroClass.prettyName,
                          value: heroClass.name
                        };
                      })
                    }
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h3'>
                    Starting attributes
                  </Header>
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
  definitions: PropTypes.object
};

CreateHeroForm.defaultProps = {
  definitions: {}
};

export default CreateHeroForm;
