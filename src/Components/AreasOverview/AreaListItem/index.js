import React from 'react';
import PropTypes from 'prop-types';
import { Item, Label, Popup } from 'semantic-ui-react';

import {
  mapEnvironmentToImage
} from '../mappers';

const AreaListItem = ({ area, environment, environmentalFeatures }) => {
  const features = _.map(
    _.get(environment, 'features'),
    id => _.find(environmentalFeatures, feature => feature.id === id)
  );

  return (
    <Item>
      <Item.Image src={ mapEnvironmentToImage(_.get(environment, 'name')) }/>
      <Item.Content>
        <Item.Header>
          { area.name }
        </Item.Header>
        <Item.Meta>
          { _.get(environment, 'prettyName') }
        </Item.Meta>
        <Item.Description>
          { _.sample(_.get(environment, 'descriptions')) }
        </Item.Description>
        <Item.Extra>
          {
            _.map(features, feature => {
              return (
                <Popup
                  content={ _.get(feature, 'description') }
                  disabled={ _.isNil(_.get(feature, 'description')) }
                  trigger={
                    <Label color='blue'>
                      { _.get(feature, 'prettyName') }
                    </Label>}
                />
              );
            })
          }
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

AreaListItem.propTypes = {
  area: PropTypes.shape({
    name: PropTypes.string
  }),
  environment: PropTypes.shape({
    name: PropTypes.string,
    prettyName: PropTypes.string,
    descriptions: PropTypes.arrayOf(PropTypes.string),
    features: PropTypes.arrayOf(PropTypes.string)
  }),
  environmentalFeatures: PropTypes.object
};

AreaListItem.defaultProps = {
  area: {},
  environment: {}
};

export default AreaListItem;
