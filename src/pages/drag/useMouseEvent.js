import { useEffect, useState, useRef } from 'react';
import { mouseMoveHandler, mouseUpHandler, sortHandler } from './handler';

export default function useMouseEvent({
  manager,
  range,
  STYLE,
  cols,
  list,
  onDragEnd,
  containerRef,
  dragClass,
  onDragCancel,
}) {
  const [dragStart, setDragStart] = useState(false);
  const LIST = useRef(list);

  useEffect(() => {
    LIST.current = list;
  }, [list]);

  useEffect(() => {
    const onMouseUp = () => {
      if (manager.current.dragElement) {
        const dragElement = manager.current.dragElement;
        manager.current = {};
        mouseUpHandler(
          containerRef.current,
          range.current,
          STYLE.current,
          cols,
        ).then(dragDetail => {
          dragElement.style.opacity = 1;
          dragDetail.list = sortHandler(LIST.current, containerRef.current);
          onDragEnd(dragDetail);
        }).catch(onDragCancel);
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

  return [dragStart, setDragStart];
}
