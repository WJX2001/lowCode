import classnames from 'classnames';
import { useRef } from 'react';
import DragLine from '../DragLine';
import './index.scss';

const DragContainer = (props) => {
  const {
    className,
    sceneKey,
    minChildWidth = 150,
    contentList = [],
    gap = 16,
  } = props;

  const cls = classnames('drag-container', className);
  const ref = useRef(null);

  // 拖拽结束时，保存宽度信息
  const onMouseUp = () => {
    const widthList = contentList.map((_, i) => {
      const child = ref.current.querySelector(`.item${i}`);
      return `${child?.offsetWidth}px`;
    });
    localStorage.setItem(sceneKey, widthList.join('#'));
  };

  const onMouseMove = (event, node) => {
    const index = parseInt(node.getAttribute('data-index'));
    const leftElement = ref.current.querySelector(`.item${index}`);
    const rightElement = ref.current.querySelector(`.item${index + 1}`);

    // 拖动距离 = 分割线的位置 - 鼠标的位置
    const dragOffset = node.getBoundingClientRect().left - event.clientX;
    console.log(node.getBoundingClientRect().left, '这是节点相对于的左边界');
    console.log(event.clientX, '这是鼠标相对于的左边界');
    console.log(dragOffset, '这是我想看的');
    const newLeftChildWidth = leftElement.offsetWidth - dragOffset;
    const newRightChildWidth = rightElement.offsetWidth + dragOffset;

    if (
      newLeftChildWidth >= minChildWidth &&
      newRightChildWidth >= minChildWidth
    ) {
      ref.current.style.setProperty(
        `--drag-childWidth-${sceneKey}-${index}`,
        `${newLeftChildWidth}px`,
      );
      ref.current.style.setProperty(
        `--drag-childWidth-${sceneKey}-${index + 1}`,
        `${newRightChildWidth}px`,
      );
    }
  };

  const contentData = [];
  const localWidthList = localStorage.getItem(sceneKey)?.split('#') || []; // 获取本地已经保存的宽度信息
  contentList.forEach((d, i) => {
    contentData.push(
      <div
        key={`${sceneKey}_${i}`}
        className={`container-item item${i}`}
        style={{
          flexBasis: `var(--drag-childWidth-${sceneKey}-${i}, ${localWidthList[i]})`,
        }}
      >
        {d}
      </div>,
    );
    if (i < contentList.length - 1) {
      contentData.push(
        <DragLine
          key={`${sceneKey}_dragline_${i}`}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          tipKey="draggableContainerFlag"
          data-index={i}
          defaultShowTip={i === 0}
          gap={gap}
        />,
      );
    }
  });

  return (
    <div ref={ref} className={cls}>
      {contentData}
    </div>
  );
};

export default DragContainer;
