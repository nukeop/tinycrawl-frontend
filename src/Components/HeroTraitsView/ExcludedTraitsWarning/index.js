import React from 'react';
import PropTypes from 'prop-types';

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
      {
        _.map(trait.excludes, excluded => {
          return (
            <div>
              {
                _.get(_.find(traitDefinitions, { name: excluded }), 'prettyName')
              }
            </div>
          );
        })
      }
    </div>
  );
};

ExcludedTraitsWarning.propTypes = {
  trait: PropTypes.shape({
    excludes: PropTypes.arrayOf(PropTypes.string)
  }),
  traitDefinitions: PropTypes.object
};

ExcludedTraitsWarning.defaultProps = {
  trait: {},
  traitDefinitions: {}
};

export default ExcludedTraitsWarning;
