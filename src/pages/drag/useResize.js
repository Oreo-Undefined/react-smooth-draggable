import { useEffect } from 'react';

export default function useResize({ containerRef, range, cols, onChange }) {
  useEffect(() => {
    let resizeObserver,
      resizeObservering = false,
      timer;
    const container = containerRef.current;
    function onResize() {
      range.current = container.getBoundingClientRect();
      const width = range.current.width / cols;
      onChange(style => ({
        ...style,
        width,
      }));
    }

    const windowResize = () => {
      if (!resizeObserver || (resizeObserver && !resizeObservering)) {
        onResize();
      }
    };

    window.addEventListener('resize', windowResize, false);

    if ('ResizeObserver' in window) {
      // IE 不支持 ResizeObserver, 先于 resize 事件执行
      resizeObserver = new ResizeObserver(() => {
        resizeObservering = true;
        onResize();
        clearTimeout(timer); // 元素的尺寸变化时，window.resize 事件不需要执行，限制一下
        timer = setTimeout(() => {
          resizeObservering = false;
        }, 10);
      });
      resizeObserver.observe(container);
    }
    onResize();
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', windowResize, false);
    };
  }, []);
}
