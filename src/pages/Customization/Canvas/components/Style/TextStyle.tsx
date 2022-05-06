import {
  Form,
  Input,
  Popover,
  Grid,
  InputNumber,
  Radio,
} from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Row, Col } = Grid;
const StyledTextArea = styled(TextArea)`
  resize: none;
  /* -webkit-text-fill-color: black; */
  /* color: black; */
`;

const TextStyle = ({
  form,
  detail,
  onConfigChange,
}: //
{
  form: any;
  detail: any;
  onConfigChange: any;
}) => {
  const [color, setColor] = useState<any>();
  useEffect(() => {
    setColor(form?.getFieldValue('color') || '#000000');
  }, [form]);
  const onChangeColor = (colorObj: any) => {
    setColor(colorObj.hex);
    onConfigChange('color', colorObj.hex, true);
    form?.setFieldValue('style.color', color);
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <FormItem label="文字" field="text">
            <StyledTextArea
              autoSize={false}
              style={{ width: '90%', height: '100px' }}
              onChange={(val: any) => {
                onConfigChange('text', val, false);
              }}
            />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="颜色" field="style.color">
            <Popover
              trigger="click"
              content={
                <ChromePicker
                  color={color}
                  onChange={onChangeColor}
                  disableAlpha={true}
                />
              }>
              <div
                style={{
                  width: '20px',
                  height: '15px',
                  background: color,
                }}></div>
            </Popover>
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
              onChange={(val: any) => {
                onConfigChange('width', `${val}px`, false);
              }}
              hideControl={true}
            />
          </FormItem>
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
              onChange={(val: any) => {
                onConfigChange('height', `${val}px`, false);
              }}
              // hideControl={true}
            />
          </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="字号" field="style.fontSize">
              <InputNumber
                style={{ width: '80%' }}
                onChange={(val: any) => {
                  onConfigChange('fontSize', val, true);
                }}
                // hideControl={true}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="字间距" field="style.lineHeight">
              <InputNumber
                style={{ width: '80%' }}
                step={0.1}
                precision={1}
                onChange={(val: any) => {
                  onConfigChange('lineHeight', val, true);
                }}
              />
            </FormItem>
          </Col>
          {/* <Col span={24}>
            <FormItem label="字体" field="style.fontStyle">
              <Input
                style={{ width: '90%', marginRight: 10 }}
                onChange={(val: any) => {
                  onConfigChange('fontStyle', val, true);
                }}
              />
            </FormItem>
          </Col> */}
          <Col span={24}>
            <FormItem label="位置" field="style.textAlign">
              <Radio.Group onChange={(val: any) => {onConfigChange('textAlign', val, true)}} >
                <Radio value='left'>居左</Radio>
                <Radio value='center'>居中</Radio>
                <Radio value='right'>居右</Radio>
              </Radio.Group>
            </FormItem>
          </Col>
      </Row>
    </>
  );
};
export default TextStyle;
