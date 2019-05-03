import React from 'react';
import PropTypes from 'prop-types';
import {
  Loader
} from 'semantic-ui-react';

import TopBarCurrency from './TopBarCurrency';

const TopBarCurrencies = props => {
  const {
    currenciesDefinitions,
    currencies
  } = props;

  if(_.isNil(currenciesDefinitions) || _.isNil(currencies)) {
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
              name={ definition.name }
              code={ definition.code }
              color={ definition.color }
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
  currencies: PropTypes.object
};

TopBarCurrencies.defaultProps = {
  currenciesDefinitions: [],
  currencies: {}
};

export default TopBarCurrencies;
