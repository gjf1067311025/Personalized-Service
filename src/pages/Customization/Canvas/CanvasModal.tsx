import { Grid, Input, Modal, Divider, Select, InputNumber, Button } from '@arco-design/web-react';
import { IconCheck } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const { Row, Col } = Grid;
const { Option } = Select;
const StyledModal = styled(Modal)`
  width: 800px;
  .arco-modal-content{
    height: 600px;
  }
`;

const StyledInput = styled(Input)`
  .arco-input-inner-wrapper{
    padding-right: 0px;
  }
`;

const CanvasModal = (
{
  showModal,
  setShowModal,
  canvasSrc,
  selectedKey,
  setSelectedKey,
  oldKey,
  findedKeys,
  testData,
  setTestData,
  testChange,
  setTestChange,
  drawCanvas,
}:
{
  showModal: any;
  setShowModal: any;
  canvasSrc: any;
  selectedKey: any;
  setSelectedKey: any;
  oldKey: any;
  findedKeys: any;
  testData: any;
  setTestData: any;
  testChange: any;
  setTestChange: any;
  drawCanvas: any;
}
) => {
  const [selectedVal, setSelectedVal] = useState<any>();
  const [selectedType, setSelectedType] = useState<any>();
  const [number, setNumber] = useState<any>(3)
  const [inputText, setInputText] = useState<any>()
  return (
    <StyledModal visible={showModal}
      onCancel={()=>{
        setShowModal(false)
        setSelectedKey(oldKey)
        setTestData({})
        setSelectedVal(null)
        setSelectedType(null)
      }}
      style={{textAlign:'center'}}
      unmountOnExit={true}
    >
      <>
        <img src={canvasSrc} height="480px" />
        <Divider/>
        <Row>
          <Col span={8}>
            <Select style={{width:'90%'}} placeholder="请选择对应字段"
              allowClear={true}
              onChange={(val:any)=>{
                setInputText(undefined)
                setNumber(1)
                if(!val) setSelectedVal(val)
                else {
                  setSelectedVal(val.slice(4))
                  setSelectedType(val.slice(0,4))
                }
              }}
            >
              {findedKeys?.map((option: any) => (
                <Option key={option?.text} value={option?.val+option?.text}>
                  {option?.text}
                </Option>
                ))
              }
            </Select>
          </Col>
          {selectedType==='List'?
            <Col span={4}>
              <InputNumber
                min={1}
                style={{width:'90%'}} 
                placeholder="请选择行数"
                disabled={!selectedVal}
                onChange={(val: any)=>{
                  setNumber(val);
                  const list = []
                  for (var i=0;i<val;i++)
                    list.push(`${inputText || 'Data'}${i+1}`)
                  testData[`${selectedVal}`] = list
                  setTestData(testData)
                  setTestChange(!testChange)
                }}
              />
            </Col>: null
          }
          <Col span={selectedType!=='List'? 16 : 12}>
            <StyledInput
              value={selectedType==='Text'?testData[`${selectedVal}`]:
                (testData[`${selectedVal}`]?.[0]?
                  testData[`${selectedVal}`]?.[0]?.slice(0,testData[`${selectedVal}`]?.[0]?.length-1):'Data')}
              suffix={<Button
                disabled={!selectedVal}
                type='outline'
                onClick={()=>{
                  drawCanvas()
                }}>
                  刷新
                </Button>
              }
              style={{width:'90%'}} 
              placeholder="请输入文字进行调整"
              disabled={!selectedVal}
              onChange={(val: any)=>{
                setInputText(val)
                if(selectedType === 'List') {
                  const list = []
                  for (var i=0;i<number;i++)
                    list.push(`${val}${i+1}`)
                  testData[`${selectedVal}`] = list
                  setTestData(testData)
                  setTestChange(!testChange)
                  return;
                }
                testData[`${selectedVal}`] = val
                setTestData(testData)
                setTestChange(!testChange)
              }}
            />
          </Col>
        </Row>
      </>
    </StyledModal>)
}

export default CanvasModal;
