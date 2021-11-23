let shadowDom = null,
  disX = 0,
  disY = 0,
  currentIndex = null,
  dragIndex = null;

// 移动元素的动画
function shadowDomAnimate(dragElement, { pageX, pageY }, dragClass) {
  if (!shadowDom) {
    shadowDom = dragElement.cloneNode(true);
    shadowDom.classList.add(dragClass);
    dragElement.style.opacity = 0;
    const { top, left, right, bottom } = dragElement.getBoundingClientRect();
    shadowDom.style.cssText =
      'transition:none;position:absolute;pointer-events:none;z-index:1;';
    shadowDom.style.top = top + 'px';
    shadowDom.style.left = left + 'px';
    shadowDom.style.width = right - left + 'px';
    shadowDom.style.height = bottom - top + 'px';
    document.body.appendChild(shadowDom);
    disX = pageX - left;
    disY = pageY - top;
  }
  shadowDom.style.top = pageY - disY + 'px';
  shadowDom.style.left = pageX - disX + 'px';
}

const getCenterPos = e => {
  if (shadowDom) {
    let { top, left, height, width } = shadowDom.getBoundingClientRect();
    return {
      pageX: left + width / 2,
      pageY: top + height / 2,
    };
  }

  return e;
};

// 判断放置位置是否发生了变化
function mousePosNoChange(
  { top, right, bottom, left },
  event,
  { width, height },
  cols,
  childNodes,
  parentNode,
) {
  let { pageX, pageY } = getCenterPos(event);
  if (cols === 1) {
    // 只有一列的排序
    if (pageX < left || pageX > right || pageY < top || pageY > bottom) {
      return true;
    }
  } else if (
    // 多列的排序
    pageX < left + width / 2 ||
    pageY < top ||
    pageY > bottom ||
    pageX + width / 2 > right
  ) {
    return true;
  }
  pageX -= left;
  pageY -= top;

  const realIndex =
    Math.floor(pageY / height) * cols + Math.floor(pageX / width);
  if (realIndex !== currentIndex && realIndex < childNodes.length) {
    currentIndex = realIndex;
    return false;
  }
  return true;
}

// 根据放置坐标和元素尺寸更新元素的位置
function updateElPos($el, $elIndex, dropIndex, { width, height }, cols) {
  if (dropIndex < dragIndex) {
    // 从后往前放
    if ($elIndex < dropIndex || $elIndex > dragIndex) {
      $el.style.transform = `translate3d(0,0,0)`;
      return;
    }
    if ($elIndex % cols === cols - 1) {
      // 换行
      $el.style.transform = `translate3d(-${width *
        (cols - 1)}px,${height}px,0)`;
    } else {
      $el.style.transform = `translate3d(${width}px,0,0)`;
    }
  } else {
    // 从前往后放
    if ($elIndex > dropIndex || $elIndex < dragIndex) {
      $el.style.transform = 'translate3d(0,0,0)';
      return;
    }
    if ($elIndex % cols === 0) {
      $el.style.transform = `translate3d(${width *
        (cols - 1)}px,-${height}px,0)`;
    } else {
      $el.style.transform = `translate3d(-${width}px,0,0)`;
    }
  }
}

// 移动时所有元素的动画
function switchDomAnimate(
  range,
  event,
  dragElement,
  container,
  baseSize,
  cols,
) {
  const childNodes = container.childNodes;
  if (
    mousePosNoChange(
      range,
      event,
      baseSize,
      cols,
      childNodes,
      container.parentNode,
    )
  ) {
    return;
  }

  [...childNodes].forEach(($el, $elIndex) => {
    if ($el !== dragElement) {
      updateElPos($el, $elIndex, currentIndex, baseSize, cols);
    }
  });
}

export function mouseMoveHandler(
  manager,
  container,
  range, // 可拖拽的区域元素父级
  baseSize,
  event,
  cols,
  dragClass,
) {
  const { dragElement, startIndex } = manager, // 拖拽控件信息
    { width, height } = baseSize; // 子元素尺寸
  if (currentIndex === null) {
    currentIndex = startIndex;
  }
  if (dragIndex === null) {
    dragIndex = startIndex;
  }
  shadowDomAnimate(dragElement, event, dragClass);
  switchDomAnimate(range, event, dragElement, container, baseSize, cols);
}

export function mouseUpHandler(
  container,
  { top, left },
  { height, width },
  cols,
) {
  if (shadowDom) {
    shadowDom.style.transition = 'all .3s';
    const Y = Math.floor(currentIndex / cols) * height + top;
    const X = Math.floor(currentIndex % cols) * width + left;
    shadowDom.style.top = `${Y}px`;
    shadowDom.style.left = `${X}px`;
    return new Promise(resolve => {
      setTimeout(() => {
        if (shadowDom) {
          document.body.removeChild(shadowDom);
          shadowDom = null;
        }
        resolve({ dragIndex, dropIndex: currentIndex });
      }, 300);
    });
  }
  return Promise.reject();
}

export function sortHandler(list, container) {
  const L = [...list];
  if (dragIndex < currentIndex) {
    const [dragItem] = L.splice(dragIndex, 1);
    L.splice(currentIndex, 0, dragItem);
  } else if (dragIndex > currentIndex) {
    const [dragItem] = L.splice(dragIndex, 1);
    L.splice(currentIndex, 0, dragItem);
  }
  container.childNodes.forEach($el => {
    $el.style.transform = `translate3d(0,0,0)`;
  });
  dragIndex = null;
  currentIndex = null;
  return L;
}
