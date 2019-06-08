import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Divider,
  Grid,
  Header
} from 'semantic-ui-react';

import styles from './styles.scss';

const HeroSelection = props => {
  const { heroes } = props;
  
  return (
    <Grid className={styles.hero_selection}>
      {
        _.map(heroes, hero => {
          return (
            <>
              <Grid.Row>
                <Link to={`/hero/${hero.id}`}>
                  <Grid className={styles.hero_selection_row_grid}>
                    <Grid.Column>
                      <Grid.Row className={styles.hero_row}>
                    
                        <Header inverted as='h4'>
                          { hero.name }
                          <Header.Subheader>
                            { `Level ${hero.level} ${hero.heroClass.prettyName}` }
                          </Header.Subheader>
                        </Header>
                    
                      </Grid.Row>
                    </Grid.Column>
                  </Grid>
                </Link>
              </Grid.Row>
              {
                !_.isEqual(hero, _.findLast(heroes)) &&
                <Divider inverted/>
              }
            </>              
          );
        })
      }
    </Grid>
  );
};

HeroSelection.propTypes = {
  heroes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      heroClass: PropTypes.shape({
        prettyName: PropTypes.string
      }),
      level: PropTypes.number
    })
  )
};

HeroSelection.defaultProps = {

};

export default HeroSelection;
