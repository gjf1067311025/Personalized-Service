import { IconExpand } from '@arco-design/web-react/icon';
import React, { useEffect } from 'react';
// import styled from 'styled-components';
import MyImage from '../components/MyFile/MyImage';
import MyList from '../components/MyFile/MyList';
import MyQRCode from '../components/MyFile/MyQrCode';
import MyText from '../components/MyFile/MyText';
import './index.css';

const Contents = ({
  contentList,
  setContentList,
  selectedKey,
  setSelectedKey,
  canvasStyle,
  testData,
}: {
  contentList: any[];
  setContentList: any;
  selectedKey: any;
  setSelectedKey: any;
  canvasStyle: any;
  testData: any;
}) => {
  window.addEventListener('click', (e: any) => {
    const id = e?.target?.id || e?.target?.offsetParent?.id;
    if (id?.includes('gaoUnique') && !id?.includes('bigger')) {
      setSelectedKey(id);
    }
  });

  useEffect(() => {
    const ind = contentList?.findIndex((val: any) => {
      return val?.key === selectedKey;
    });
    const father = document.getElementById('father');
    const moving = document.getElementById(selectedKey);
    const bigger = document.getElementById(`bigger${selectedKey}`);
    let x = 0;
    let y = 0;
    let l = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    let isDown = false;
    let isBig = false;
    // 鼠标按下事件
    if (moving && father) {
      const fatherPos = father.getBoundingClientRect();
      if(bigger) {
        bigger.onmousedown = (e: any) => {
          // 获取x坐标和y坐标
          x = e.clientX;
          y = e.clientY;

          // 获取左部和顶部的偏移量
          l = moving?.offsetLeft;
          t = moving?.offsetTop;

          w = moving?.offsetWidth;
          h = moving?.offsetHeight;
          // 开关打开
          isBig = true;
          // 设置样式
          // moving.style.cursor = 'move';
        };
      }
      
      moving.onmousedown = (e: any) => {
        // console.log(fatherPos);
        // 获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        // 获取左部和顶部的偏移量
        l = moving?.offsetLeft;
        t = moving?.offsetTop;

        w = moving?.offsetWidth;
        h = moving?.offsetHeight;
        // 开关打开
        isDown = true;
        // 设置样式
        // moving.style.cursor = 'move';
      };
      // 鼠标移动
      window.onmousemove = (e: any) => {
        if (isBig) {
          let finalWidth = '';
          if (l + w + e.clientX - x > fatherPos?.width) {
            finalWidth = `${fatherPos?.width - l}px`;
          } else {
            finalWidth = `${w + e.clientX - x}px`;
          }
          moving.style.width = finalWidth;
          contentList[ind].config.width = finalWidth;

          let finalHeight;
          if (t + h + e.clientY - y > fatherPos?.height) {
            finalHeight = `${fatherPos?.height - t}px`;
          } else {
            finalHeight = `${h + e.clientY - y}px`;
          }
          moving.style.height = finalHeight;
          contentList[ind].config.height = finalHeight;
          setContentList([...contentList]);
          return;
        }
        if (!isDown) {
          return;
        }
        // 获取x和y
        const nx = e.clientX;
        const ny = e.clientY;
        // 计算移动后的左偏移量和顶部的偏移量
        const nl = nx - (x - l);
        const nt = ny - (y - t);
        let finalLeft = '';
        let finalRight = '';
        if (nl < 0) {
          finalLeft = `${0}px`;
          finalRight = 'unset';
        } else if (nl + moving.offsetWidth > fatherPos.width) {
          finalLeft = `${fatherPos.width - moving.offsetWidth}px`;
          finalRight = `unset`;
        } else {
          finalLeft = `${nl}px`;
          finalRight = 'unset';
        }
        moving.style.left = finalLeft;
        moving.style.right = finalRight;
        contentList[ind].config.left = finalLeft;
        contentList[ind].config.right = finalRight;

        let finalTop = '';
        let finalBottom = '';
        if (nt < 0) {
          finalTop = `${0}px`;
          finalBottom = 'unset';
        } else if (nt + moving.offsetHeight > fatherPos.height) {
          finalTop = `${fatherPos.height-moving.offsetHeight}px`;
          finalBottom = `unset`;
        } else {
          finalTop = `${nt}px`;
          finalBottom = 'unset';
        }
        moving.style.top = finalTop;
        moving.style.bottom = finalBottom;
        contentList[ind].config.top = finalTop;
        contentList[ind].config.bottom = finalBottom;
        setContentList([...contentList]);
      };
      // 鼠标抬起事件
      window.onmouseup = () => {
        isDown = false;
        isBig = false;
        moving.style.cursor = 'default';
      }
      // 鼠标抬起事件
      moving.onmouseup = () => {
        // 开关关闭
        isDown = false;
        isBig = false;
        moving.style.cursor = 'default';
      };
    }
  }, [selectedKey]);

  const getContent = (value: any) => {
    if (value?.config?.type === 'Image') {
      return <MyImage config={value?.config} />;
    } else if (value?.config?.type === 'Text') {
      return <MyText config={value?.config} testData={testData}/>;
    } else if (value?.config?.type === 'QRCode') {
      return <MyQRCode config={value?.config} testData={testData}/>;
    } else if (value?.config?.type === 'List') {
      return <MyList config={value?.config} testData={testData}/>;
    } else {
      return null;
    }
  };

  return (
    <div
      id="content"
      style={{
        width: '100%',
        minHeight: '60%',
        maxHeight: '90%',
        // background: 'white',
        overflow: 'auto',
      }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'white',
          ...canvasStyle,
        }}
        id="father">
        {[...contentList]?.map((val: any) => {
          return (
            <div
              style={{
                border:
                  val?.key === selectedKey ? '2px dashed #ff0000' : 'unset',
                position: 'absolute',
                width: val?.config?.width || 100,
                height: val?.config?.height || 100,
                top: val?.config?.top || 0,
                left: val?.config?.left || 0,
                right: val?.config?.top || 'unset',
                bottom: val?.config?.bottom || 'unset',
                // background: '#b9b9b9',
              }}
              key={val?.key}
              id={val?.key}>
              {getContent(val)}
              {selectedKey === val?.key && val?.config?.type !== "QRCode" ? (
                <IconExpand
                  id={`bigger${val?.key}`}
                  style={{
                    transform: 'rotate(90deg)',
                    width: 10,
                    height: 10,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contents;
