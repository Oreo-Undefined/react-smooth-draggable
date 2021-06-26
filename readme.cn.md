# react-smooth-draggable

提供当前各类拖拽排序库中缺少的二维排序的功能，基于 react 框架。


具体效果可点击视频查看 [效果视频](https://user-images.githubusercontent.com/31264862/123385877-9f6f9e80-d5c8-11eb-9a4d-0071efa7459d.mp4)

如果只是单列或单行的排序，推荐使用 react-smooth-dnd。

## Getting Started


```
npm install react-smooth-draggable -S
```
在使用 react-smooth-draggable 的组件中，
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

> 拖拽结束时，你必须调用 onDragEnd 方法以更新列表的状态

## props

| Name | Type | Default | Description |
|-|:-:|:-:|-|
|list|{Array}|[]|参与排序的列表数组，务必保证每一项有唯一的 id 属性，作为 key 使用|
|onDragStart|{Function}|undefined|undefined|开始拖拽时执行的方法，参数为当前拖拽的索引 dragIndex |
|onDragEnd|{Function}|--- |放置时执行的方法，参数为 { list, dragIndex, dropIndex }，list 为***排序后***的列表|
|cols|{Number}|1|呈现为几列|
|height|{Number}|80|单个元素的高度（单位：px），必须指定固定值|
|render|{Function}|undefined|自定义每一项的渲染方法，参数为当前项数据对象|
|children|{Function\|ReactElement\|null}|null|同 render，当 render 存在时，优先使用 render|
|dragClass|{String}|''|拖动时，随鼠标移动的项的样式类名|
|itemClass|{String}|''|正常项的样式类名|
|wraperClass|{String}|''|每一项内直接包裹渲染部分的样式类名|

### dragClass, itemClass, wraperClass 之间的关系，仅为伪码示例
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

**MIT**

## Keywords

**react, sortable, drag and drop, drag&drop, drag, drop, draggable, dnd, smooth**