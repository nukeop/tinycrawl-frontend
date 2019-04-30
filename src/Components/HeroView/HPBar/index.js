import React from 'react';
import PropTypes from 'prop-types';
import {
  Progress
} from 'semantic-ui-react';

const HPBar = props => {
  const { value, total } = props;
  return (
    <Progress
      inverted
      color='red'
      size='tiny'
      value={ value }
      total={ total }
    >
      HP: { value }/{ total }
    </Progress>
  );
};

HPBar.propTypes = {
  value: PropTypes.number,
  total: PropTypes.number
};

HPBar.defaultProps = {
  value: 0,
  total: 0
};

export default HPBar;
