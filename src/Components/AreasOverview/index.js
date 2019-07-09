import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Dimmer,
  Grid,
  Header,
  Item,
  List,
  Loader,
  Placeholder,
  Segment
} from 'semantic-ui-react';

import constants from '../../constants';
import GameIcon from '../GameIcon';
import AreaListItem from './AreaListItem';

import styles from './styles.scss';

const AreasOverview = ({
  areas,
  environments,
  environmentalFeatures,
  discover
}) => {
  return (
    <Grid
      centered
      padded
      className={styles.areas_overview}
    >
      <Grid.Column>
        
        <Container text>
          <Grid.Column className={styles.discover_column}>
            <Segment inverted>
              <Button
                className={styles.discover_button}
                primary
                inverted
                fluid
                size='huge'
                onClick={ discover }
              >
              Discover a new area (1
                <GameIcon
                  name='atomic-slashes'
                  className={styles.currency_icon}
                />
              )
              </Button>
            </Segment>
          </Grid.Column>
          
          <Grid.Column>
            <Segment inverted>
              <Dimmer active={ areas.loading }>
                <Loader />
              </Dimmer>
              {
                areas.loading &&
                  <Placeholder inverted>
                    { _.map(_.range(5), () => {return <Placeholder.Line />;}) }
                  </Placeholder>
              }

              {
                !areas.loading &&
                  <Item.Group inverted>
                    {
                      _.map(areas, area => {
                        return <AreaListItem
                          area={ area }
                          environment={
                            _.find(environments, e => e.id === area.environment)
                          }
                          environmentalFeatures={ environmentalFeatures }
                        />;
                      })
                    }
                  </Item.Group>
              }
                
            </Segment>
          </Grid.Column>
        </Container>
      </Grid.Column>
    </Grid>
  );
};

AreasOverview.propTypes = {
  areas: PropTypes.array,
  environments: PropTypes.array,
  environmentalFeatures: PropTypes.array,
  discover: PropTypes.func
};

AreasOverview.defaultProps = {
  areas: [],
  environments: [],
  environmentalFeatures: [],
  discover: () => {}
};

export default AreasOverview;
