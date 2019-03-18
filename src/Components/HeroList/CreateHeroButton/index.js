import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'arwes';

import styles from './styles.scss';

const CreateHeroButton = props => {
  return (
    <Heading
      className={styles.create_hero_button}
      >
      Create a hero
    </Heading>
  );
};

CreateHeroButton.propTypes = {
  createHero: PropTypes.func
};

CreateHeroButton.defaultProps = {
  createHero: PropTypes.func
};

export default CreateHeroButton;
