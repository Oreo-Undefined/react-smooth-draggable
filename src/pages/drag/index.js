import React, { useState } from 'react';
import Dragable from './Dragable';
import styles from './index.less';

export default function Index() {
  const [list, setList] = useState(() =>
    Array(16)
      .fill(0)
      .map((_, index) => ({ id: index + 1 })),
  );

  const onChange = ({ list }) => setList(list);

  return (
    <Dragable
      list={list}
      onDragEnd={onChange}
      cols={7}
      height={120}
      dragClass={styles.dragClass}
      itemClass={styles.itemClass}
      wraperClass={styles.wraperClass}
    >
      {item => <span>{item.id}</span>}
    </Dragable>
  );
}
