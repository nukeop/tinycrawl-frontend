import React from 'react';

import styles from './styles.scss';

const LoggedInOnly = () => {
  return (
    <span className={styles.logged_in_only}>
    This content is only available for logged in users.
    </span>
  );
};

export default LoggedInOnly;
