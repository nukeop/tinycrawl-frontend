import React from 'react';
import { Divider, Placeholder } from 'semantic-ui-react';

const HeroCardPlaceholder = () => {
  return (
    <Placeholder inverted fluid>
      <Placeholder.Header image>
        <Placeholder.Line length='full' />
        <Placeholder.Line />
      </Placeholder.Header>
      
    </Placeholder>
  );
};

export default HeroCardPlaceholder;
