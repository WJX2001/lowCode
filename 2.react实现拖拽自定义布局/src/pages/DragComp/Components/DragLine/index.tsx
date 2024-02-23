import { Button, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import './index.less';

interface Props {
  gap: number; // 间距
  onMouseMove: (args: any) => void;
  onMouseUp: (args: any) => void;
  style: any;
  tipKey: any;
  defaultShowTip: any;
}

const DragLine: React.FC<Props> = (props) => {
  const {
    gap = 16,
    onMouseMove,
    onMouseUp,
    style = {},
    tipKey,
    defaultShowTip = false,
  } = props;

  const [visible, setVisible] = useState<boolean>(defaultShowTip);

  // 拿到线的ref
  const ref = useRef(null);
  const eventRef = useRef(null);

  // 关闭提示框
  const closeNavTips = () => {
    localStorage.setItem(tipKey, 'true'); // 设置标记
    setVisible(false); // 关闭弹窗
  };

  // 拖拽结束
  const handleMouseUp = (e: any) => {
    document.body.classList.remove('dragging');
  };

  // 开始拖拽
  // const handleMouseDown = () => {
  //   closeNavTips(); // 关闭拖拽提示框
  //   document.body.classList.add('dragging');
  //   eventRef.current;
  // };

  const line = (
    // <div
    //   ref={ref}
    //   style={{
    //     '--drag-gap': `${gap}px`,
    //     ...style,
    //   }}
    //   className={`drag-line ${visible ? 'active' : ''}}`}
    // />
    <div
      style={{
        '--drag-gap': `${gap}px`,
        ...style,
      }}
      className={`drag-line ${visible ? 'active' : ''}}`}
    >
      我是那根线
    </div>
  );

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
      1111
    </Tooltip>
  ) : (
    line
  );
};

export default DragLine;
