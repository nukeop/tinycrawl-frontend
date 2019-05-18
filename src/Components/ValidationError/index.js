import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

const ValidationError = props => {
  const { error } = props;
  return (
    error &&
    <Label
      pointing='right'
      color='red'
      icon='exclamation circle'
    >
      { error }
    </Label>
  );
};

ValidationError.propTypes = {
  error: PropTypes.node
};

ValidationError.defaultProps = {
  error: null
};

export default ValidationError;
