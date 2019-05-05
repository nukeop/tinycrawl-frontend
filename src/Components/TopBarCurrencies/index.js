import React from 'react';
import PropTypes from 'prop-types';
import {
  Loader
} from 'semantic-ui-react';

import TopBarCurrency from './TopBarCurrency';

const TopBarCurrencies = props => {
  const {
    currenciesDefinitions,
    currencies,
    loading
  } = props;

  if(loading) {
    return <Loader active inverted />;
  }
  
  return (
    <React.Fragment>
      {
        _.map(_.toPairs(currencies), currency => {
          const definition = _.find(
            currenciesDefinitions,
            { id: _.head(currency) }
          );
          
          return (
            <TopBarCurrency
              key={ _.get(definition, 'name') }
              name={ _.get(definition, 'name') }
              code={ _.get(definition, 'code') }
              color={ _.get(definition, 'color') }
              amount={ _.last(currency) }
            />
          );
        })
      }
    </React.Fragment>
  );
};

TopBarCurrencies.propTypes = {
  currenciesDefinitions: PropTypes.array,
  currencies: PropTypes.object,
  loading: PropTypes.bool
};

TopBarCurrencies.defaultProps = {
  currenciesDefinitions: [],
  currencies: {},
  loading: true
};

export default TopBarCurrencies;
