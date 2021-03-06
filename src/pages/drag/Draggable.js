import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import useResize from './useResize';
import useMouseEvent from './useMouseEvent';
import styles from './style.less';

export default function Dragable({
  cols = 7,
  height = 80,
  list,
  onDragStart,
  onDragEnd = () => null,
  onDragCancel = () => null,
  children,
  render,
  dragClass,
  itemClass,
  wraperClass,
}) {
  const containerRef = useRef();
  const manager = useRef({});
  const range = useRef({});
  const [style, setStyle] = useState({ height });
  const STYLE = useRef(style);

  useResize({ containerRef, range, cols, onChange: setStyle });
  const [dragStart, setDragStart] = useMouseEvent({
    manager,
    range,
    STYLE,
    cols,
    list,
    onDragEnd,
    containerRef,
    dragClass,
    onDragCancel,
  });

  useEffect(() => {
    STYLE.current = style;
  }, [style]);

  const onMouseDown = (e, index) => {
    range.current = containerRef.current.getBoundingClientRect();
    manager.current = {
      dragElement: e.currentTarget,
      dragging: true,
      startIndex: index,
    };
    setDragStart(true);
    onDragStart && onDragStart(index);
  };

  const renderItem =
    typeof render === 'function'
      ? render
      : typeof children === 'function'
      ? children
      : () => children;

  return (
    <div ref={containerRef} className={styles.DragContainer}>
      {list.map((item, index) => (
        <div
          className={classnames(
            styles.DragItem,
            itemClass,
            dragStart && styles.transition,
          )}
          style={style}
          key={item.id || index}
          onMouseDown={e => onMouseDown(e, index)}
        >
          <div className={classnames(styles.Dragwraper, wraperClass)}>
            {renderItem(item, index)}
          </div>
        </div>
      ))}
    </div>
  );
}
