import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import styles from './styles.scss';

const RequiredTraitsMessage = props => {
  const {
    trait,
    traitDefinitions
  } = props;

  if (_.isNil(trait)) {
    return null;
  }
  
  return (
    <div className={styles.required_traits_message}>
      {
        !_.isEmpty(trait.prerequisites) &&
          'Prerequisites:'
      }
      <List>
        {
          _.map(trait.prerequisites, prereq => {
            return (
              <List.Item key={ prereq }>
                {
                  _.get(_.find(traitDefinitions, { name: prereq }), 'prettyName')
                }
              </List.Item>
            );
          })
        }
      </List>
    </div>
  );
};


RequiredTraitsMessage.propTypes = {
  trait: PropTypes.shape({
    prerequisites: PropTypes.arrayOf(PropTypes.string)
  }),
  traitDefinitions: PropTypes.array
};

RequiredTraitsMessage.defaultProps = {
  trait: {},
  traitDefinitions: []
};

export default RequiredTraitsMessage;
