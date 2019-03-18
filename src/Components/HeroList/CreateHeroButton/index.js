import React from 'react';
import PropTypes from 'prop-types';
import { Button, Heading } from 'arwes';

import styles from './styles.scss';

const CreateHeroButton = props => {
  return (
    <Button animate>
      <Heading
        className={styles.create_hero_button}
      >
        Create a hero
      </Heading>
    </Button>
  );
};

CreateHeroButton.propTypes = {
  createHero: PropTypes.func
};

CreateHeroButton.defaultProps = {
  createHero: PropTypes.func
};

export default CreateHeroButton;
