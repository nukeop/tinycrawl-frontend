import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const HeroCard = props => {
  return (
    <div className={styles.hero_card}>
      { props.hero.name }
    </div>
  );
};

HeroCard.propTypes = {
  hero: PropTypes.shape({
    name: PropTypes.string
  })
};

HeroCard.defaultProps = {
  hero: {}
};

export default HeroCard;
