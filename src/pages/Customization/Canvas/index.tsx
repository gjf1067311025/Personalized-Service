import { Button, Dropdown, Grid, Input, Menu, Modal, Select, Upload } from '@arco-design/web-react';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import Config from './Config';
import { canvansList, ownSrc } from './constant';
import Contents from './Contents';
import Tools from './Tools';
import CanvasModal from './CanvasModal';
// import {test} from './constant'
import DownloadModal from './DownloadModal';
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { IconCheck } from '@arco-design/web-react/icon';
import { GetNewData } from '../../../apis';
import ReactDOM from 'react-dom';
import ShowContent from './Contents/ShowContent';

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

  const [contentList, setContentList] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDownload, setShowModalDownload] = useState<boolean>(false);
  const [showModalChoose, setShowModalChoose] = useState<boolean>(false);
  const [urlText, setUrlText] = useState<any>();
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
  const [fileList, setFileList] = useState<any>([])
  const [templateList, setTemplateList] = useState<any>([])
  const [testSrc, setTestSrc] = useState<any[]>(ownSrc || [])
  const [buttonDisable, setButtonDisable] = useState<boolean>(false)
  let promiseNum : number = 0

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
      // DOM ?????????????????????
      const width = parseValue(box.width);
      const height = parseValue(box.height);
      // ???????????????-????????????
      const scaleBy = DPR();
      // ??????????????? canvas ??????
      const canvas = document.createElement('canvas');

      // ?????? canvas ????????????????????? DOM ???????????? * ?????????
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;
      // ?????? canvas css????????? DOM ????????????
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // ????????????
      const context = canvas.getContext('2d');

      if (context) {
        // ???????????????????????????????????????
        // context.scale(scaleBy, scaleBy);

        // ???????????? canvas ????????????????????????????????????
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
    // console.log(number)
    const dom = document.getElementById('father');
    // const dom = document.querySelector('printHtml');
    if (dom) {
      const box = window.getComputedStyle(dom);
      // DOM ?????????????????????
      const width = parseValue(box.width);
      const height = parseValue(box.height);
      // ???????????????-????????????
      const scaleBy = DPR();
      // ??????????????? canvas ??????
      const canvas = document.createElement('canvas');

      // ?????? canvas ????????????????????? DOM ???????????? * ?????????
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;
      // ?????? canvas css????????? DOM ????????????
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // ????????????
      const context = canvas.getContext('2d');

      if (context) {
        // ???????????????????????????????????????
        // context.scale(scaleBy, scaleBy);

        // ???????????? canvas ????????????????????????????????????
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
      const number = document?.getElementById('showNumber');
      request.onload = (res: any) => {
        promiseNum += 1
        if(number) {
          number.innerHTML=`???????????????,??????????????????${promiseNum} / ${testSrc?.length}`
        }
        // console.log(promiseNum,'out')
        if (res.target.status === 200) {
            resolve(res.target.response)
        } else {
            reject(res)
        }
      }
      request.send()
    })
  }

  const downloadCanvas = (list?: any) => {
    
    const zip = new JSZip()
    let result = []
    const files = list || canvasDownloadList
    for (let i in files) {
      let promise = getFileBlob(files[i]?.url).then((res: any) => {
        const file_name = `${files[i]?.id || '??????'}.png`;
        zip.file(file_name, res, { binary: true })
      })
      result.push(promise)
    }
    console.log('start promise')
    Promise.all(result).then(() => {
      const number = document?.getElementById('showNumber');

      if(number) {
        number.innerHTML="?????????????????????????????????????????????"
      }
      zip.generateAsync({ type: "blob" }, (metaData: any)=>{
        if(number) {
          number.innerHTML=`?????????????????????${metaData.percent}%`
        }
      }).then((res) => {
          const elementA = document.createElement('a');

          elementA.download = '??????.zip';
          elementA.style.display = 'none';

          const blob = new Blob([res]);
          console.log('finish all')
          elementA.href = URL.createObjectURL(blob);
          document.body.appendChild(elementA);
          elementA.click();
          document.body.removeChild(elementA);
          // await saveAs(res, "??????.zip")
          if(number) {
            number.innerHTML="??????????????????/??????"
          }
          setButtonDisable(false)
          setShowModalDownload(false)
      })
      
      
    })
  }

  const downloadTemplate = (fileName: string, fileMsg: any) => {
    const elementA = document.createElement('a');

    elementA.download = fileName;
    elementA.style.display = 'none';

    const blob = new Blob([JSON.stringify(fileMsg)]);

    elementA.href = URL.createObjectURL(blob);
    document.body.appendChild(elementA);
    elementA.click();
    document.body.removeChild(elementA);
  }


  //????????????Excel??????
  const readWorkbookFromLocalFile=(files: any) => {
    var fileReader = new FileReader()
    fileReader.readAsBinaryString(files[0])
    return new Promise(function(resolve, reject) {
      fileReader.onload = function (ev: any) {
        try {
          var data = ev?.target.result
          var workbook = XLSX.read(data, {
            type: 'binary'
          }) // ???????????????????????????????????????excel????????????
          // var fromTo = '';
          var sheetContent = []
          // ?????????????????????
          for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              // fromTo = workbook.Sheets[sheet]['!ref'] || '';
              // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
              // const sheetStr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{header:1})
              sheetContent.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{raw:false,defval:''}))
              // console.log(sheetContent)
              // let id = ''
              let curVal = {}
              const midList = sheetContent?.[0]?.map((val: any) => {
                let midVal = val
                if(val?.id) {
                  curVal = val
                  midVal = val
                }
                else {
                  Object.keys(curVal).forEach((key: string) => {
                    if(!val?.[`${key}`]) midVal[`${key}`] = curVal?.[key as keyof typeof curVal]
                  })
                  curVal = midVal
                }
                return midVal;
              })
              const finalList: any[] = []
              let midFinalVal: any[] = []
              let id = ''
              midList.forEach((val: any)=>{
                if(!id) {
                  id = val?.id
                  midFinalVal.push(val)
                }
                else if (val?.id===id) {
                  midFinalVal.push(val)
                }
                else {
                  let finalVal: any = midFinalVal?.[0]
                  finalVal.id = id
                  let a = midFinalVal?.[0]
                  Object.keys(a)?.forEach((v: any)=>{
                    const tList = midFinalVal?.filter((u: any)=>{
                      return u?.[v as keyof typeof a] !== a[`${v}`]
                    })
                    if (!tList.length && !v?.includes('&&')) {
                      finalVal[`${v}`] = a[`${v}`]
                    }
                    else {
                      let l = midFinalVal?.map((u: any)=>{
                        return u?.[v as keyof typeof a]
                      })
                      const finalV: string = v?.includes('&&') ? v?.split('&&')?.[0] : v
                      finalVal[`${finalV}`] = l
                      finalVal[`${v}`] = l
                    }
                  })
                  finalList.push(finalVal)
                  id = val?.id
                  midFinalVal=[]
                  midFinalVal.push(val)
                }
              })
              let finalVal: any = midFinalVal?.[0]
              finalVal.id = id
              let a = midFinalVal?.[0]
              Object.keys(a)?.forEach((v: any)=>{

                const tList = midFinalVal?.filter((u: any)=>{
                  return u?.[v as keyof typeof a] !== a[`${v}`]
                })
                if (!tList.length && !v?.includes('&&')) {
                  finalVal[`${v}`] = a[`${v}`]
                }
                else {
                  let l = midFinalVal?.map((u: any)=>{
                    return u?.[v as keyof typeof a]
                  })
                  const finalV: string = v?.includes('&&') ? v?.split('&&')?.[0] : v
                  finalVal[`${finalV}`] = l
                  finalVal[`${v}`] = l
                }
              })
              finalList.push(finalVal)
              setTestSrc(finalList)
              setOldKey(selectedKey);
              setSelectedKey(undefined);
              setShowModalDownload(true)
              setShowModalChoose(false)
              setFileList([])
              // console.log(finalList)
              break; // ????????????????????????????????????????????????
            }
          }
          const respondBody = {
            code: 100,
            msg: '??????????????????',
            body: sheetContent
          }
          resolve(respondBody)
        } catch (e) {
          const respondBody = {
            code: 500,
            msg: e,
            body: ''
          }
          reject(respondBody)
        }
      }
    })
  }

  const readTemplateFromLocalFile=(files: any) => {
    var fileReader = new FileReader()
    fileReader.readAsText(files[0])
    return new Promise(function(resolve, reject) {
      fileReader.onload = function (ev: any) {
        try {
          var data = ev?.target.result
          // console.log(JSON.parse(data))
          setContentList(JSON.parse(data))
          setTemplateList([])
          const respondBody = {
            code: 100,
            msg: '??????????????????',
            body: data
          }
          resolve(respondBody)
        } catch (e) {
          const respondBody = {
            code: 500,
            msg: e,
            body: ''
          }
          reject(respondBody)
        }
      }
    })
  }

  const findKeys = () =>{
    const list : any[] = []
    contentList?.filter((val:any) => {
      return val?.config?.type === 'List' || 
        (val?.config?.type === 'Text' && 
        (val?.config?.text?.includes('&{') && val?.config?.text?.includes('}&')))
    })?.forEach((val: any) => {
      if(val?.config?.type === 'List') {
        let text = val?.config?.text;
        while (text?.includes('&{') && text?.includes('}&')) {
          text = text?.slice(text?.indexOf('&{') + 2);
          list.push({
            val: 'List',
            text:text?.split('}&')?.[0],
          })
          text = text?.slice(text?.indexOf('}&') + 2);
        }
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


  const draw = async () => {
    console.log('start downloading')
    const images: any[] = []
    for(let index=0; index< testSrc.length; index++) {
      let val = testSrc[index]
      const number = document?.getElementById('showNumber');
      const div = document?.createElement('div');
      div.id = 'myDiv';
      div.style.width=canvasStyle?.width
      div.style.height=canvasStyle?.height
      document.querySelector("#root")?.appendChild(div);
      ReactDOM.render(
        <ShowContent
          contentList={contentList}
          canvasStyle={canvasStyle}
          testData={val}
          father={index+1}
        />,
        div
      );
      console.log(`finish render ${index+1}`)
      if (number) {
        number.innerHTML = `???????????? ${images?.length?`${images?.length} / ${testSrc?.length}` : '?????????????????????'}`;
      }
      const dom = document.getElementById(`father${index+1}`);
      if(dom) {
        const box = window.getComputedStyle(dom);
        // DOM ?????????????????????
        const width = parseValue(box.width);
        const height = parseValue(box.height);
        // ???????????????-????????????
        const scaleBy = 300/96;
        // ??????????????? canvas ??????
        const canvas = document.createElement('canvas');

        // ?????? canvas ????????????????????? DOM ???????????? * ?????????
        canvas.width = width * scaleBy;
        canvas.height = height * scaleBy;
        // ?????? canvas css????????? DOM ????????????
        canvas.style.width = `${width * scaleBy}px`;
        canvas.style.height = `${height * scaleBy}px`;
        const context = canvas.getContext('2d');
        // console.log(a)
        if (context) {
          // ???????????????????????????????????????
          // context.scale(scaleBy, scaleBy);
          // ???????????? canvas ????????????????????????????????????
          console.log(scaleBy,DPR(), 222);
          const canvasAll = await html2canvas(dom, {
            canvas,
            scale: scaleBy,
            allowTaint: true,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
          })
          // document.querySelector("#root")?.appendChild(canvas);
          // console.log(canvasAll.toDataURL('image/png'));
          document.querySelector("#root")?.removeChild(div);
          images.push({id:val?.id,url:canvasAll.toDataURL('image/png')});
          // downloadList.push(canvasAll.toDataURL('image/png'))
          // console.log(images)
          if(images.length===testSrc.length) {
            downloadCanvas(images)
          }
        }
      }
    }
  }

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
              placeholder="?????????????????????"
              onChange={(val: any) => {
                setCanvasStyle(val);
              }}
              disabled={contentList?.length !== 0}
              defaultValue="????????????"
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
          <Dropdown droplist={(
              <Menu >
                <Menu.Item key='1'>
                  <Upload
                    limit={1}
                    action='/' 
                    fileList={templateList}
                    onChange={(files: any)=>{
                      setTemplateList(files);
                      readTemplateFromLocalFile(files.map((val: any)=>{
                        return val?.originFile
                      }))
                    }}
                    autoUpload={false}
                  ><Button type='text'>??????</Button></Upload>
                </Menu.Item>
              </Menu>
              )}
              position='top'
              unmountOnExit={false}
            >
              <Button
                type="outline"
                style={{ marginRight: 20 }}
                size="large">
                ??????
              </Button>
            </Dropdown>
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
              ??????
            </Button>
            <Dropdown droplist={(
              <Menu >
                <Menu.Item key='1'>
                  <Button type='text'
                    onClick={()=>{
                      downloadTemplate("??????.txt",contentList)
                    }}
                  >??????</Button>
                </Menu.Item>
                <Menu.Item key='2'>
                  <Button type='text' onClick={()=>{
                    setShowModalChoose(true)
                  }}>??????</Button>
                </Menu.Item>
              </Menu>
              )}
              position='top'
              unmountOnExit={false}
            >
              <Button
                type="primary"
                status="success"
                style={{ marginRight: 20 }}
                size="large">
                ??????
              </Button>
            </Dropdown>
            {/* <Button
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
              ??????
            </Button> */}
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
    {/* <DownloadModal
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
      testSrc={testSrc}
      setTestSrc={setTestSrc}
      draw={draw}
    /> */}
    <Modal
      title="?????????????????????"
      visible={showModalChoose}
      onCancel={()=>{
        setShowModalChoose(false)
        setUrlText('')
      }}
      footer={null}
    >
      <Row>
        <Col span={18}>
          <Input 
            placeholder='??????????????????????????????url'
            value={urlText} 
            onChange={(val: any)=>{
              setUrlText(val)
            }}
            allowClear={true}
            style={{marginBottom: 10, padding: 0}}
            suffix={
              <IconCheck
                style={{cursor:'pointer', color:'#165dff'}}
                onClick={async ()=>{
                  const data = await GetNewData(urlText)
                  console.log(data)
                  setTestSrc(data)
                  setOldKey(selectedKey);
                  setSelectedKey(undefined);
                  setShowModalDownload(true)
                  setShowModalChoose(false)
                }}
              />
            }
          />
        </Col>
        <Col offset={1} span={4}>
          <Upload
            limit={1}
            action='/' 
            fileList={fileList}
            onChange={(files: any)=>{
              setFileList(files);
              readWorkbookFromLocalFile(files.map((val: any)=>{
                return val?.originFile
              }))
            }}
            autoUpload={false}
          ><Button type='primary'>??????Excel</Button></Upload>
        </Col>
      </Row>
    </Modal>
    <Modal
      title="????????????"
      visible={showModalDownload}
      closable={false}
      escToExit={false}
      maskClosable={false}
      onCancel={()=>{
        setShowModalDownload(false)
      }}
      cancelButtonProps={{disabled: buttonDisable }}
      okButtonProps={{disabled: buttonDisable}}
      onOk={async ()=>{
        setButtonDisable(true)
        await draw()
      }}
    >
      <div style={{textAlign:'center'}}>?????????????????????????????????????????????</div>
      <div id="showNumber" style={{textAlign:'center'}}>??????????????????/??????</div>
    </Modal>
    
    </>
  );
};

export default Canvas;
