/*eslint-disable*/
import React from 'react';
import '@lottiefiles/lottie-player';
import styles from './index.less';

export default function Loading() {
  return (
    <div className={styles.Loading}>
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://assets8.lottiefiles.com/packages/lf20_mz8KSF.json"
        style={{ width: '140px', height: '140px' }}
      ></lottie-player>
    </div>
  );
}
