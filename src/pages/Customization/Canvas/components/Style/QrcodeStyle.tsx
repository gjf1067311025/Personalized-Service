import { Form, Grid, Input, InputNumber } from '@arco-design/web-react';
import React from 'react';

const FormItem = Form.Item;
const { Row, Col } = Grid;

const QrcodeStyle = ({
  // form,
  onConfigChange,
  detail,
}: {
  // form: any;
  onConfigChange: any;
  detail: any;
}) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <FormItem
            label="二维码"
            style={{ marginTop: '10px' }}
            field="image_url">
            <Input
              placeholder='请输入二维码对应字段'
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
              onChange={(val: any) => {
                onConfigChange('width', `${val}px`, false);
                onConfigChange('height', `${val}px`, false);
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
            {/* <InputNumber
              value={detail?.height?.split('px')[0]}
              style={{ width: '80%' }}
              onChange={(val: any) => {
                onConfigChange('height', `${val}px`, false);
              }}
              // hideControl={true}
            /> */}
            <InputNumber 
              value={detail?.height?.split('px')[0]} 
              style={{ width: '80%' }} 
              disabled
            />
          </FormItem>
        </Col>
      </Row>
    </>
  );
};

export default QrcodeStyle;
