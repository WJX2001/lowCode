
import React, { useEffect, useRef, useState } from 'react';
import { Button, Tooltip } from 'antd';
import './index.scss';


const DragLine = ((props) => {
  const {
    gap = 16,
    onMouseMove,
    onMouseUp,
    style = {},
    tipKey,
    defaultShowTip,
    ...rest
  } = props;
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const eventRef = useRef({});

  useEffect(() => {
    setVisible(defaultShowTip);
  }, []);

  const closeNavTips = () => {
    localStorage.setItem(tipKey, 'true'); // 设置标记
    setVisible(false); // 关闭弹窗
  };

  // 拖拽结束
  const handleMouseUp = (e) => {
    document.body.classList.remove('dragging');
    onMouseUp && onMouseUp(e, ref.current);
    document.removeEventListener('mousemove', eventRef.current.mouseMoveHandler, false);
    document.removeEventListener('mouseup', eventRef.current.mouseUpHandler, false);
  };

  // 拖拽中
  const handleMouseMove = (e) => {
    onMouseMove && onMouseMove(e, ref.current);
  };

  // 开始拖拽
  const handleMouseDown = () => {
    closeNavTips();// 关闭拖拽提示框
    document.body.classList.add('dragging');
    eventRef.current.mouseMoveHandler = (e) => handleMouseMove(e);
    eventRef.current.mouseUpHandler = (e) => handleMouseUp(e);
    document.addEventListener('mousemove', eventRef.current.mouseMoveHandler, false);
    document.addEventListener('mouseup', eventRef.current.mouseUpHandler, false);
  };

  const line = (
    <div
      ref={ref}
      style={{
        '--drag-gap': `${gap}px`,
        ...style,
      }}
      className={`drag-line ${visible ? 'active' : ''}`}
      onMouseDown={handleMouseDown}
      {...rest}
    />
  );

  return visible ? (
    <Tooltip
      open
      placement="rightTop"
      title={(
        <div>
          <div style={{ marginBottom: 4 }}>拖动这根线试试~</div>
          <Button size="small" onClick={closeNavTips}>关闭</Button>
        </div>
      )}
    >
      {line}
    </Tooltip>
  ) : line;
});

export default DragLine;
