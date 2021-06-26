import React, { useState } from 'react';
import Draggable from 'react-smooth-draggable';
import styles from './index.less';

export default function Index() {
  const [list, setList] = useState(() =>
    Array(16)
      .fill(0)
      .map((_, index) => ({ id: index + 1 })),
  );

  const onDragEnd = ({ list }) => setList(list);

  return (
    <Draggable
      list={list}
      onDragEnd={onDragEnd}
      cols={7}
      height={120}
      dragClass={styles.dragClass}
      itemClass={styles.itemClass}
      wraperClass={styles.wraperClass}
    >
      {item => <span>{item.id}</span>}
    </Draggable>
  );
}
