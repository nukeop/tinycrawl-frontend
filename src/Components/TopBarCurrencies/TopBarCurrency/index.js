import React from 'react';
import PropTypes from 'prop-types';
import {
  Popup
} from 'semantic-ui-react';

import GameIcon from '../../GameIcon';

import styles from './styles.scss';

const currencyToIcon = currencyCode => {
  switch(currencyCode) {
  case 'PIP':
    return 'atom-core';
  case 'SM':
    return 'atomic-slashes';
  default:
    return 'unknown';
  }
};

const TopBarCurrency = props => {
  const {
    name,
    code,
    color,
    amount
  } = props;
  
  return (
    <div
      className={styles.top_bar_currency}
      style={{ fill: color, color }}
    >
      <Popup trigger={
        <div className={styles.currency_icon}>
          <GameIcon size='large' name={ currencyToIcon(code) } />
        </div>
      }
      content={ name }
      position='bottom right'
      />
      <div className={styles.currency_amount}>{ amount }</div>
    </div>
  );
};

TopBarCurrency.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};

export default TopBarCurrency;
