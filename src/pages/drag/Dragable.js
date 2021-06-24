import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { mouseMoveHandler, mouseUpHandler, sortHandler } from './handler';
import styles from './style.less';

export default function Dragable({
  cols = 7,
  height = 80,
  list,
  onChange,
  children,
  render,
  dragClass,
  itemClass,
  wraperClass,
}) {
  const containerRef = useRef();
  const manager = useRef({});
  const range = useRef({});
  const [dragStart, setDragStart] = useState(false);
  const [style, setStyle] = useState({ height });
  const STYLE = useRef(style);

  useEffect(() => {
    STYLE.current = style;
    range.current = containerRef.current.getBoundingClientRect();
  }, [style]);

  useEffect(() => {
    function onResize() {
      const container = containerRef.current;
      range.current = container.getBoundingClientRect();
      const width = range.current.width / cols;
      setStyle(style => ({
        ...style,
        width,
      }));
    }
    window.addEventListener('resize', onResize, false);
    onResize();
    return () => window.removeEventListener('resize', onResize, false);
  }, []);

  const onMouseDown = (e, index) => {
    manager.current.dragElement = e.currentTarget;
    manager.current.dragging = true;
    manager.current.startIndex = index;
    setDragStart(true);
  };

  useEffect(() => {
    const onMouseUp = () => {
      if (manager.current.dragElement) {
        manager.current.dragElement.style.opacity = 1;
        manager.current = {};
        mouseUpHandler(range.current, STYLE.current, cols).then(() => {
          onChange(list => sortHandler(list, containerRef.current));
        });
      }
      setDragStart(false);
    };

    const onMouseMove = e => {
      if (manager.current.dragging) {
        mouseMoveHandler(
          manager.current,
          containerRef.current,
          range.current,
          STYLE.current,
          e,
          cols,
          dragClass,
        );
      }
    };

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false);
      window.removeEventListener('mouseup', onMouseUp, false);
    };
  }, []);

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
            {renderItem(item)}
          </div>
        </div>
      ))}
    </div>
  );
}
