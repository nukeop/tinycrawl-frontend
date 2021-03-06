import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import styles from './styles.scss';

const ExcludedTraitsWarning = props => {
  const {
    trait,
    traitDefinitions
  } = props;

  if (_.isNil(trait)) {
    return null;
  }
  
  return (
    <div className={styles.excluded_traits_warning}>
      {
        !_.isEmpty(trait.excludes) &&
        'Buying this trait will exclude the following traits:'
      }
      <List>
        {
          _.map(trait.excludes, excluded => {
            return (
              <List.Item key={ excluded }>
                {
                  _.get(_.find(traitDefinitions, { name: excluded }), 'prettyName')
                }
              </List.Item>
            );
          })
        }
      </List>
    </div>
  );
};

ExcludedTraitsWarning.propTypes = {
  trait: PropTypes.shape({
    excludes: PropTypes.arrayOf(PropTypes.string)
  }),
  traitDefinitions: PropTypes.array
};

ExcludedTraitsWarning.defaultProps = {
  trait: {},
  traitDefinitions: []
};

export default ExcludedTraitsWarning;
