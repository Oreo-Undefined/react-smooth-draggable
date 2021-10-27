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
  const [list2, setList2] = useState(() =>
    Array(16)
      .fill(0)
      .map((_, index) => ({ id: index + 1 })),
  );

  const onChange2 = ({ list }) => setList2(list);

  return (<>
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
    <Dragable
      list={list2}
      onDragEnd={onChange2}
      cols={3}
      height={120}
      dragClass={styles.dragClass}
      itemClass={styles.itemClass}
      wraperClass={styles.wraperClass}
    >
      {item => <span>{item.id}</span>}
    </Dragable>
  </>);
}
