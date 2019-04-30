import React from 'react';
import PropTypes from 'prop-types';
import {
  Progress
} from 'semantic-ui-react';

const ExperienceBar = props => {
  const { value, total } = props;
  return (
    <Progress
      inverted
      color='violet'
      size='tiny'
      value={ value }
      total={ total }
    >
      EXP: { value }/{ total }
    </Progress>
  );
};

ExperienceBar.propTypes = {
  value: PropTypes.number,
  total: PropTypes.number
};

ExperienceBar.defaultProps = {
  value: 0,
  total: 0
};

export default ExperienceBar;
