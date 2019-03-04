import React from 'react';
import { Words } from 'arwes';

import styles from './styles.scss';

const LoggedInOnly = () => {
  return (
    <span className={styles.logged_in_only}>
      <Words animate>
        This content is only available for logged in users.
      </Words>
    </span>
  );
};

export default LoggedInOnly;
