import { Button, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

interface Props {
  gap: number; // 间距
  onMouseMove?: (args1: any, args2: any) => void;
  onMouseUp: (args1: any, args2: any) => void;
  style?: any;
  tipKey: any;
  defaultShowTip: boolean;
}

const DragLine: React.FC<Props> = (props) => {
  const {
    gap = 16,
    onMouseMove,
    onMouseUp,
    style = {},
    tipKey,
    defaultShowTip,
  } = props;

  const [visible, setVisible] = useState<boolean>(defaultShowTip);

  // 拿到线的ref
  const ref = useRef(null);
  const eventRef = useRef(null);

  useEffect(() => {
    setVisible(defaultShowTip);
  }, []);

  // 关闭提示框
  const closeNavTips = () => {
    localStorage.setItem(tipKey, 'true'); // 设置标记
    setVisible(false); // 关闭弹窗
  };

  // 拖拽中
  const handleMouseMove = (e: any) => {
    onMouseMove?.(e, eventRef.current);
  };

  // 拖拽结束
  const handleMouseUp = (e: any) => {
    document.body.classList.remove('dragging');
    onMouseUp?.(e, ref.current);
  };

  // 开始拖拽
  const handleMouseDown = () => {
    closeNavTips(); // 关闭拖拽提示框
    document.body.classList.add('dragging');
    if (eventRef.current) {
      // @ts-ignore
      eventRef.current.mouseMoveHandler = (e: any) => handleMouseMove(e);
      // @ts-ignore
      eventRef.current.mouseUpHandler = (e: any) => handleMouseUp(e);
    }

    document.addEventListener(
      'mousemove',
      eventRef?.current?.mouseMoveHandler,
      false,
    );

    document.addEventListener(
      'mouseup',
      eventRef?.current?.mouseUpHandler,
      false,
    );
  };

  const line = (
    <div
      ref={ref}
      style={{
        '--drag-gap': `${gap}px`,
        ...style,
      }}
      className={`drag-line ${visible ? 'active' : ''}}`}
      onMouseDown={handleMouseDown}
    >
      我是那根线
    </div>
  );
  console.log(ref.current, '1111');

  return visible ? (
    <Tooltip
      open
      placement="rightTop"
      title={
        <div>
          <div style={{ marginBottom: 4 }}>拖动这个线试试</div>
          <Button size="small" onClick={closeNavTips}>
            关闭
          </Button>
        </div>
      }
    >
      {line}
    </Tooltip>
  ) : (
    line
  );
};

export default DragLine;
