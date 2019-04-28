import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Header
} from 'semantic-ui-react';

import HeroStatsLine from '../HeroStatsLine';

const StartingAttributes = props => {
  const { selectedClass } = props;
  
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

StartingAttributes.propTypes = {
  selectedClass: PropTypes.shape({
    baseHp: PropTypes.number,
    baseAttack: PropTypes.number,
    baseDefense: PropTypes.number
  }).isRequired
};

export default StartingAttributes;
