import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Grid,
  Header,
  List
} from 'semantic-ui-react';

import { mapSlotToIcon } from '../../../utils';
import GameIcon from '../../GameIcon';

import styles from './styles.scss';

const HeroEquipmentSlots = props => {
  const { slots } = props;
  return (
    <div className={ styles.hero_equipment_slots }>
      <Grid.Row>
        <Header inverted as='h3'>
          Equipment
        </Header>
      </Grid.Row>
      <List inverted>
        {
          _.map(slots, slot => {
            return (
              <List.Item>
                <GameIcon
                  name={ mapSlotToIcon(slot.name) }
                  color='dark'
                  size='big'
                />
                <span className={cx(
                  styles.empty,
                  styles.equipped_gear
                )} >
                  { '< Empty >' }
                </span>
                <label>{ slot.prettyName }</label>
              </List.Item>
            );
          })
        }
      </List>
    </div>
  );
};

HeroEquipmentSlots.propTypes = {
  slots: PropTypes.array
};

HeroEquipmentSlots.defaultProps = {
  slots: []
};

export default HeroEquipmentSlots;
