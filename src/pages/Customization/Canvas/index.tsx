import { Button, Grid, Select } from '@arco-design/web-react';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import Config from './Config';
import { canvansList } from './constant';
import Contents from './Contents';
import Tools from './Tools';
import CanvasModal from './CanvasModal';
import {test} from './constant'
import DownloadModal from './DownloadModal';
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const StyledSelect = styled(Select)`
  .arco-select-view {
    background: white;
  }
  .arco-menu-item {
    margin: 0;
  }
`;

const { Row, Col } = Grid;
const { Option } = Select;

const Canvas: FC = () => {
  const history = useHistory();

  const [contentList, setContentList] = useState<any[]>(test || []);
  const [selectedKey, setSelectedKey] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDownload, setShowModalDownload] = useState<boolean>(false);
  const [canvasSrc, setCanvasSrc] = useState<any>();
  const [canvasStyle, setCanvasStyle] = useState<any>({
    width: '595px',
    height: '842px',
  });
  const [oldKey, setOldKey] = useState<any>();
  const [findedKeys, setFindedKeys] = useState<any[]>([])
  const [testData, setTestData] = useState<any>({})
  const [testChange, setTestChange] = useState<boolean>(false)
  const [canvasDownloadList, setCanvasDownloadList] = useState<any[]>([]);

  const DPR = () => {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
      return window.devicePixelRatio;
    } else {
      return 1;
    }
  };
  const parseValue = (value: any) => {
    return parseInt(value, 10);
  };

  const drawCanvas = () => {
    const dom = document.getElementById('father');
    // const dom = document.querySelector('printHtml');
    if (dom) {
      const box = window.getComputedStyle(dom);
      // DOM 节点计算后宽高
      const width = parseValue(box.width);
      const height = parseValue(box.height);
      // 获取像素比-防止模糊
      const scaleBy = DPR();
      // 创建自定义 canvas 元素
      const canvas = document.createElement('canvas');

      // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;
      // 设定 canvas css宽高为 DOM 节点宽高
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // 获取画笔
      const context = canvas.getContext('2d');

      if (context) {
        // 将所有绘制内容放大像素比倍
        // context.scale(scaleBy, scaleBy);

        // 将自定义 canvas 作为配置项传入，开始绘制
        return html2canvas(dom, { 
            canvas, 
            allowTaint: true, 
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
          }).then((canvasAll: any) => {
          // document.querySelector("#canvasContainer").appendChild(canvas);
          // console.log(canvasAll.toDataURL('image/png'));
          setCanvasSrc(canvasAll.toDataURL('image/png'));
          return canvasAll.toDataURL('image/png');
        });
      }
    }
  };

  const drawDownloadCanvas = (number: number) => {
    console.log(number)
    const dom = document.getElementById('father');
    // const dom = document.querySelector('printHtml');
    if (dom) {
      const box = window.getComputedStyle(dom);
      // DOM 节点计算后宽高
      const width = parseValue(box.width);
      const height = parseValue(box.height);
      // 获取像素比-防止模糊
      const scaleBy = DPR();
      // 创建自定义 canvas 元素
      const canvas = document.createElement('canvas');

      // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;
      // 设定 canvas css宽高为 DOM 节点宽高
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // 获取画笔
      const context = canvas.getContext('2d');

      if (context) {
        // 将所有绘制内容放大像素比倍
        // context.scale(scaleBy, scaleBy);

        // 将自定义 canvas 作为配置项传入，开始绘制
        return html2canvas(dom, { 
            canvas, 
            allowTaint: true, 
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
          }).then((canvasAll: any) => {
          // document.querySelector("#canvasContainer").appendChild(canvas);
          // console.log(canvasAll.toDataURL('image/png'));
          setCanvasSrc(canvasAll.toDataURL('image/png'));
          canvasDownloadList[number] = canvasAll.toDataURL('image/png')
          setCanvasDownloadList(canvasDownloadList)
          return canvasAll.toDataURL('image/png');
        });
      }
    }
  };

  const getFileBlob = (url: any) => {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest()
      request.open("GET", url, true)
      request.responseType = "blob"
      request.onload = (res: any) => {
        if (res.target.status === 200) {
            resolve(res.target.response)
        } else {
            reject(res)
        }
      }
      request.send()
    })
  }

  const downloadCanvas = () => {
    const zip = new JSZip()
    let result = []
    const files = canvasDownloadList
    for (let i in files) {
      let promise = getFileBlob(files[i]).then((res: any) => {
        const file_name = `图片${i}.png`;
        zip.file(file_name, res, { binary: true })
      })
      result.push(promise)
    }
    Promise.all(result).then(() => {
      zip.generateAsync({ type: "blob" }).then((res) => {
          saveAs(res, "文件.zip")
      })
    })
  }

  // const downloadCanvas = () => {
  //   const dom = document.getElementById('father');
  //   // const dom = document.querySelector('printHtml');
  //   if (dom) {
  //     const box = window.getComputedStyle(dom);
  //     // DOM 节点计算后宽高
  //     const width = parseValue(box.width);
  //     const height = parseValue(box.height);
  //     // 获取像素比-防止模糊
  //     const scaleBy = DPR();
  //     // 创建自定义 canvas 元素
  //     const canvas = document.createElement('canvas');

  //     // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  //     canvas.width = width * scaleBy;
  //     canvas.height = height * scaleBy;
  //     // 设定 canvas css宽高为 DOM 节点宽高
  //     canvas.style.width = `${width}px`;
  //     canvas.style.height = `${height}px`;
  //     // 获取画笔
  //     const context = canvas.getContext('2d');

  //     if (context) {
  //       // 将所有绘制内容放大像素比倍
  //       // context.scale(scaleBy, scaleBy);

  //       // 将自定义 canvas 作为配置项传入，开始绘制
  //       return html2canvas(dom, { 
  //           canvas, 
  //           allowTaint: true, 
  //           useCORS: true,
  //           scrollX: 0,
  //           scrollY: 0,
  //         }).then((canvasAll: any) => {
  //         // document.querySelector("#canvasContainer").appendChild(canvas);
  //         // return canvas.toDataURL("image/png");
  //         setCanvasSrc(canvasAll.toDataURL('image/png'));
  //         var oA = document.createElement("a");
  //         document.body.appendChild(oA);
  //         canvasDownloadList?.forEach((val: any, index: any)=>{
  //           console.log(val)
  //           oA.download = `图片${index}.png`;// 设置下载的文件名，默认是'下载'
  //           oA.href = val
  //           oA.click();
  //         })
  //         oA.remove(); // 下载之后把创建的元素删除
  //         return canvasAll.toDataURL('image/png');
  //       });
  //     }
  //   }
  // };

  const findKeys = () =>{
    const list : any[] = []
    contentList?.filter((val:any) => {
      return val?.config?.type === 'List' || 
        (val?.config?.type === 'Text' && 
        (val?.config?.text?.includes('&{') && val?.config?.text?.includes('}&')))
    })?.forEach((val: any) => {
      if(val?.config?.type === 'List') {
        list.push({
          val: 'List',
          text: val?.config?.text,
        })
      }
      else {
        let text = val?.config?.text;
        while (text?.includes('&{') && text?.includes('}&')) {
          text = text?.slice(text?.indexOf('&{') + 2);
          list.push({
            val: 'Text',
            text:text?.split('}&')?.[0],
          })
          text = text?.slice(text?.indexOf('}&') + 2);
        }
      }
    })
    setFindedKeys(list)
  }

  useEffect(() => {
    if(!selectedKey) {
      drawCanvas();
    }
    const ind = contentList?.findIndex((val: any) => {
      return val?.key === selectedKey;
    });
    setSelectedIndex(ind);
  }, [selectedKey]);


  return (
    <>
    <div style={{ background: '#F2F2F2', height: '750px', marginTop: 24 }}>
      <Row>
        <Col span={7}>
          <div
            style={{
              background: '#ffffff',
              height: '700px',
              margin: 40,
            }}>
            <Tools
              contentList={contentList}
              setContentList={setContentList}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              // setRefresh={setRefresh}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        </Col>
        <Col span={10}>
          <div
            style={{
              height: '700px',
              margin: '40px 10px',
            }}>
            <Contents
              contentList={contentList}
              setContentList={setContentList}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              canvasStyle={canvasStyle}
              testData={testData}
            />
          </div>
        </Col>
        <Col span={7}>
          <div
            style={{
              margin: 40,
              marginTop: 20,
              marginBottom: 20,
            }}>
            <StyledSelect
              placeholder="请选择画布大小"
              onChange={(val: any) => {
                setCanvasStyle(val);
              }}
              disabled={contentList?.length !== 0}
              defaultValue="默认大小"
              triggerProps={{
                autoAlignPopupWidth: true,
              }}>
              {canvansList.map((val: any) => (
                <Option key={val?.label} value={val?.value}>
                  {val?.label}
                </Option>
              ))}
            </StyledSelect>
          </div>
          <div
            style={{
              background: '#ffffff',
              height: '600px',
              margin: 40,
              marginTop: 0,
            }}>
            <Config
              contentList={contentList}
              setContentList={setContentList}
              // selectedKey={selectedKey}
              // setSelectedKey={setSelectedKey}
              selectedIndex={selectedIndex}
              canvasStyle={canvasStyle}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              type="outline"
              style={{ marginRight: 20 }}
              onClick={() => {
                findKeys();
                setOldKey(selectedKey);
                setSelectedKey(undefined);
                setShowModal(true)
              }}
              size="large">
              预览
            </Button>
            <Button
              type="primary"
              status="success"
              style={{ marginRight: 20 }}
              onClick={() => {
                // downloadCanvas()
                setOldKey(selectedKey);
                setSelectedKey(undefined);
                setShowModalDownload(true)
              }}
              size="large">
              保存
            </Button>
          </div>
        </Col>
      </Row>
    </div>
    <CanvasModal
      showModal={showModal}
      setShowModal={setShowModal}
      canvasSrc={canvasSrc}
      selectedKey={selectedKey}
      setSelectedKey={setSelectedKey}
      oldKey={oldKey}
      findedKeys={findedKeys}
      testData={testData}
      setTestData={setTestData}
      testChange={testChange}
      setTestChange={setTestChange}
      drawCanvas={drawCanvas}
      // setOldKet={setOldKey}
    />
    <DownloadModal
      showModal={showModalDownload}
      setShowModal={setShowModalDownload}
      canvasSrc={canvasSrc}
      selectedKey={selectedKey}
      setSelectedKey={setSelectedKey}
      oldKey={oldKey}
      canvasDownloadList={canvasDownloadList}
      setCanvasDownloadList={setCanvasDownloadList}
      setCanvasSrc={setCanvasSrc}
      drawDownloadCanvas={drawDownloadCanvas}
      setTestData={setTestData}
      testChange={testChange}
      setTestChange={setTestChange}
      downloadCanvas={downloadCanvas}
    />
    </>
  );
};

export default Canvas;
