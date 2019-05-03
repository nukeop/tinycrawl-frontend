import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AtomCore from '../../../resources/icons/delapouite/atom-core.svg';
import ChestArmor from '../../../resources/icons/delapouite/chest-armor.svg';
import RobotHelmet from '../../../resources/icons/delapouite/robot-helmet.svg';

import AtomicSlashes from '../../../resources/icons/lorc/atomic-slashes.svg';
import BolterGun from '../../../resources/icons/lorc/bolter-gun.svg';
import Canister from '../../../resources/icons/lorc/cannister.svg';
import SpaceSuit from '../../../resources/icons/lorc/space-suit.svg';
import Uncertainty from '../../../resources/icons/lorc/uncertainty.svg';

import styles from './styles.scss';

const mapNameToIcon = name => {
  switch(name) {
  case 'atom-core':
    return AtomCore;
  case 'atomic-slashes':
    return AtomicSlashes;
  case 'canister':
    return Canister;
  case 'chest-armor':
    return ChestArmor;
  case 'robot-helmet':
    return RobotHelmet;
  case 'bolter-gun':
    return BolterGun;
  case 'space-suit':
    return SpaceSuit;
  default:
    return Uncertainty;
  }
};

const name = props => {
  const {
    name,
    size,
    color,
    className,
    style
  } = props;
  
  return (
    <span
      className={cx(
        styles.tc, styles.game_icon,
        size,
        color,
        className
      )}
      style={ style }
      dangerouslySetInnerHTML={ { __html: mapNameToIcon(name) } }
    />
  );
};

name.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object
};

name.defaultProps = {
  name: null,
  className: '',
  size: 'medium',
  color: 'white',
  style: {}
};

export default name;
