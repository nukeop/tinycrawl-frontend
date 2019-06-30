import React from 'react';
import PropTypes from 'prop-types';
import {
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

import AreaListItem from './AreaListItem';

import styles from './styles.scss';

const AreasOverview = ({ areas, environments, environmentalFeatures }) => {
  return (
    <Grid
      centered
      padded
      className={styles.areas_overview}
    >
      <Grid.Row centered>
        <Grid.Column>
          <Container text>
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
          </Container>
        </Grid.Column>     
      </Grid.Row>
    </Grid>
  );
};

AreasOverview.propTypes = {
  areas: PropTypes.array
};

AreasOverview.defaultProps = {
  areas: {}
};

export default AreasOverview;
