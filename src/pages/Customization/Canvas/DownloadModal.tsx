import { Grid, Input, Modal, Divider, Select, InputNumber, Button } from '@arco-design/web-react';
import { IconCheck, IconLeft, IconRight } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { testSrc } from './constant';

const { Row, Col } = Grid;
const { Option } = Select;
const StyledModal = styled(Modal)`
  width: 800px;
  .arco-modal-content{
    height: 600px;
  }
`;

const DownloadModal = (
{
  showModal,
  setShowModal,
  canvasSrc,
  selectedKey,
  setSelectedKey,
  oldKey,
	canvasDownloadList,
	setCanvasDownloadList,
	setCanvasSrc,
	drawDownloadCanvas,
	setTestData,
	testChange,
  setTestChange,
  downloadCanvas,
}:
{
  showModal: any;
  setShowModal: any;
  canvasSrc: any;
  selectedKey: any;
  setSelectedKey: any;
  oldKey: any;
	canvasDownloadList: any;
	setCanvasDownloadList: any;
	setCanvasSrc: any;
	drawDownloadCanvas: any;
	setTestData: any;
	testChange: any;
  setTestChange: any;
  downloadCanvas: any;
}
) => {
	const [imgNum, setImgNum] = useState<number>(0)
  // const [modalChange, setModalChange] = useState<any>(false)
  // useEffect(()=>{
  //   if (!modalChange) return
  //   // console.log(111)
  //   const btn = document.getElementById('nextButton')
  //   if (btn) {
  //     while(imgNum!==testSrc.length - 1) {
  //       console.log(imgNum)
  //       btn.click()
  //     }
  //   }
  //   setImgNum(0)
	// 	setTestData(testSrc?.[0])
  //   setTestChange(!testChange)	
  // },[modalChange])

	useEffect(()=>{
		drawDownloadCanvas(imgNum)
	},[testChange])

  return (
    <StyledModal 
			visible={showModal}
      onOk={()=>{
        // setModalChange(true)
        // let num = imgNum
        // console.log(num)
        // const btn = document.getElementById('nextButton')
        // if (btn) {
        //   while(num !== testSrc.length) {
        //     console.log(num)
        //     btn.click()
        //     num = num + 1
        //   }
        // }
        downloadCanvas()
      }}
			afterOpen={()=>{
        setImgNum(0)
				setTestData(testSrc?.[0])
        setTestChange(!testChange)	
			}}
      onCancel={()=>{
        setShowModal(false)
        setSelectedKey(oldKey)
        setTestData({})
				setCanvasDownloadList([])
        // setModalChange(false)
      }}
      style={{textAlign:'center'}}
      unmountOnExit={true}
    >
      <Row align='center' style={{height: 550}}>
        <Col span={2}>
        	<Button
						disabled={imgNum===0}
            shape='circle'
						onClick={() => {
							if(!canvasDownloadList?.[imgNum - 1]) {
								setTestData(testSrc?.[imgNum - 1])
                setTestChange(!testChange)
							}
							else setCanvasSrc(canvasDownloadList?.[imgNum - 1])
							setImgNum(imgNum - 1)
						}}
					>
						<IconLeft />
					</Button>
				</Col>
        <Col span={20}><img src={canvasSrc} height="550px" /></Col>
        <Col span={2}>
					<Button id='nextButton'
						disabled={imgNum === testSrc.length -1}
						shape='circle'
						onClick={() => {
							if(!canvasDownloadList?.[imgNum + 1]) {
								setTestData(testSrc?.[imgNum + 1])
                setTestChange(!testChange)
							}
							else setCanvasSrc(canvasDownloadList?.[imgNum + 1])
							setImgNum(imgNum + 1)
						}}
					>
						<IconRight />
					</Button>
				</Col>
      </Row>
    </StyledModal>)
}

export default DownloadModal;
