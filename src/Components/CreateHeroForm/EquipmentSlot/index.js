import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  Popup
} from 'semantic-ui-react';

import { mapSlotToIcon } from '../../../utils';
import GameIcon from '../../GameIcon';

import styles from './styles.scss';

const EquipmentSlot = props => {
  const { slot } = props;
  
  return (
    <Popup
      trigger={
        <Label
          className={ styles.equipment_slot_label }
        >
          <GameIcon
            name={ mapSlotToIcon(slot) }
            size='big'
          />
        </Label>
      }
      content={ slot }
    />
    
  );
};

EquipmentSlot.propTypes = {
  slot: PropTypes.string
};

EquipmentSlot.defaultProps = {

};

export default EquipmentSlot;
