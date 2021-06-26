# react-smooth-draggable
It provides the function of two-dimensional sorting which is missing in all kinds of drag sort libraries. It is based on react framework.


The specific effect can be viewed by clicking the video [Effects video](https://user-images.githubusercontent.com/31264862/123385877-9f6f9e80-d5c8-11eb-9a4d-0071efa7459d.mp4)

If it is only a single column or single row sort, it is recommended to use react-smooth-dnd。

## Getting Started


```
npm install react-smooth-draggable -S
```
In the component which react-smooth-draggable is used in，
```jsx
import React, { useState } from 'react';
import Draggable from 'react-smooth-draggable';
import styles from './index.less';

export default function Index() {
  const [list, setList] = useState(() =>
    Array(16).fill(0).map((_, index) => ({ id: index + 1 })),
  );

  const onDragEnd = ({ list, /* dragIndex, dropIndex */ }) => setList(list);

  return (
    <Draggable
      list={list}
      onDragEnd={onDragEnd}
      cols={4}
      height={80}
      dragClass={styles.dragClass}
      itemClass={styles.itemClass}
      wraperClass={styles.wraperClass}
    >
      {item => <span>{item.id}</span>}
    </Draggable>
  );
}
```

> At the end of the drag, you must call the ondragend method to update the status of the list

## props

| Name | Type | Default | Description |
|-|:-:|:-:|-|
|list|{Array}|[]|The list array participating in sorting must ensure that each item has a unique id attribute, which is used as a key|
|onDragStart|{Function}|undefined|undefined|The method to be executed at the beginning of the drag. The parameter is the index of the current drag dragIndex |
|onDragEnd|{Function}|--- |The method to execute when placing. The parameter is { list, dragIndex, dropIndex }，list is the one *** sorted*** |
|cols|{Number}|1|Present as several columns|
|height|{Number}|80|Height of individual elements（unit：px），A fixed value must be specified|
|render|{Function}|undefined|Customize the rendering method of each item, and the parameter is the current item data object|
|children|{Function\|ReactElement\|null}|null|the same as render，When a render exists, it takes precedence|
|dragClass|{String}|''|The style class name of the item that moves with the mouse as you drag|
|itemClass|{String}|''|The style class name of the normal item|
|wraperClass|{String}|''|The style class name of the normal item. The style class name of the rendering part is directly wrapped in each item|

### The relationship between dragClass, itemClass and wraperClass, only a pseudo code example below
```jsx
<div className={styles.DragContainer}>
    <div className={itemClass}>
        <div className={wraperClass}>{ render(item1) }</div>
    </div>
    <div className={itemClass}>
        <div className={wraperClass}>{ render(item2) }</div>
    </div>
    {/* when dragging item3 */}
    <div className={classnames(itemClass, dragClass)}>
        <div className={wraperClass}>{ render(item3) }</div>
    </div>
    ...
</div>
```

## License

MIT

## Keywords

**react, sortable, drag and drop, drag&drop, drag, drop, draggable, dnd, smooth**