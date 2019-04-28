import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.scss';

const HeroStatsLine = props => {
  const { name, value } = props;
  return (
    <div className={ styles.hero_stats_line }>
      <div className={ styles.hero_stats_name }>
        { name }:
      </div>
      <div className={ styles.hero_stats_value }>
        { value }
      </div>
    </div>
  );
};

HeroStatsLine.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number
};

export default HeroStatsLine;
