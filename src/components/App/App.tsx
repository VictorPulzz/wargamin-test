import React, { FC } from 'react';

import { Tabs } from '~/components/Tabs';

import styles from './App.module.scss';

export const App: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Tabs />
      </div>
    </div>
  );
};
