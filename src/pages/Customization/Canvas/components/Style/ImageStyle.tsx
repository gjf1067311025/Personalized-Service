import { Checkbox, Form, Grid, Input, InputNumber } from '@arco-design/web-react';
import React, { useState } from 'react';

const FormItem = Form.Item;
const { Row, Col } = Grid;

const ImageStyle = ({
  // form,
  onConfigChange,
  detail,
  canvasStyle,
}: {
  // form: any;
  onConfigChange: any;
  detail: any;
  canvasStyle: any;
}) => {
  const [widthDisable, setWidthDisable] = useState<boolean>(false);
  const [heightDisable, setHeightDisable] = useState<boolean>(false);

  return (
    <>
      <Row>
        <Col span={24}>
          <FormItem
            label="图片来源"
            style={{ marginTop: '10px' }}
            field="image_url">
            <Input
              placeholder='请粘贴图片地址'
              style={{ width: '90%' }}
              onChange={(val: any) => {
                onConfigChange('image_url', val, false);
              }}
            />
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            label="距离(左)"
            field="">
            <InputNumber
              value={detail?.left?.split('px')[0]}
              style={{ width: '80%' }}
              onChange={(val: any) => {
                onConfigChange('left', `${val}px`, false);
              }}
              hideControl={true}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            label="距离(上)"
            field="">
            <InputNumber
              value={detail?.top?.split('px')[0]}
              style={{ width: '80%' }}
              onChange={(val: any) => {
                onConfigChange('top', `${val}px`, false);
              }}
              hideControl={true}
            />
            {/* px */}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            label="宽度(W)"
            field="">
            <InputNumber
              value={detail?.width?.split('px')[0]}
              style={{ width: '80%' }}
              disabled={widthDisable}
              onChange={(val: any) => {
                onConfigChange('width', 
                  val>canvasStyle?.width?.split('px')[0]?canvasStyle?.width:`${val}px`,
                  false);
              }}
              hideControl={true}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <Checkbox onChange={(checked: any) =>{
            if (checked) {
              onConfigChange('width', canvasStyle?.width, false);
              setWidthDisable(true)
            }
            else setWidthDisable(false)
          }}>宽度全屏</Checkbox>
        </Col>
        <Col span={12}>
          <FormItem
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            label="高度(H)"
            field="">
            <InputNumber
              value={detail?.height?.split('px')[0]}
              style={{ width: '80%' }}
              disabled={heightDisable}
              onChange={(val: any) => {
                onConfigChange('height', 
                  val>canvasStyle?.height?.split('px')[0]?canvasStyle?.height:`${val}px`,
                  false);
              }}
              hideControl={true}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <Checkbox onChange={(checked: any) =>{
            if (checked) {
              onConfigChange('height', canvasStyle?.height, false);
              setHeightDisable(true)
            }
            else setHeightDisable(false)
          }}>高度全屏</Checkbox>
        </Col>
      </Row>
    </>
  );
};

export default ImageStyle;
