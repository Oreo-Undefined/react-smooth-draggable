import React, { useState } from 'react';
import Dragable from './Dragable';
import styles from './index.less';

export default function Index() {
  const [list, setList] = useState(() =>
    Array(16)
      .fill(0)
      .map((_, index) => ({ id: index + 1 })),
  );
  return (
    <Dragable
      list={list}
      onChange={setList}
      cols={5}
      height={80}
      dragClass={styles.dragClass}
      itemClass={styles.itemClass}
      wraperClass={styles.wraperClass}
    >
      {item => <span>{item.id}</span>}
    </Dragable>
  );
}
