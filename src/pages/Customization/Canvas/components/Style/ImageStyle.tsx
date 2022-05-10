import { Button, Checkbox, Form, Grid, Input, InputNumber, Upload } from '@arco-design/web-react';
import { IconUpload } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormItem = Form.Item;
const { Row, Col } = Grid;

const StyledInput = styled(Input)`
  .arco-input-inner-wrapper{
    padding-right: 0px;
  }
`;

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
  const [imageList, setImageList] = useState<any>([]);

  useEffect(()=>{
    setWidthDisable(detail?.width===canvasStyle.width)
    setHeightDisable(detail?.height===canvasStyle.height)
  },[detail])

  const readImageFromLocalFile=(files: any) => {
    var fileReader = new FileReader()
    fileReader.readAsDataURL(files[0])
    return new Promise(function(resolve, reject) {
        fileReader.onload = function (ev: any) {
            try {
                var data = ev?.target.result
                // console.log(data)
                onConfigChange('image_url', data, false);
                const respondBody = {
                    code: 100,
                    msg: '文件解析成功',
                    body: data
                }
                resolve(respondBody)
            } catch (e) {
                const respondBody = {
                    code: 500,
                    msg: '文件类型不正确',
                    body: ''
                }
                reject(respondBody)
            }
        }
    })
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <FormItem
            label="图片来源"
            style={{ marginTop: '10px' }}
            field="">
            <StyledInput
              value={detail?.image_url}
              placeholder='粘贴url或上传本地图片'
              style={{ width: '90%' }}
              onChange={(val: any) => {
                if(!val) setImageList([])
                onConfigChange('image_url', val, false);
              }}
              allowClear={true}
              suffix={
                <Upload
                  disabled={imageList?.length}
                  action='/' 
                  fileList={imageList}
                  onChange={(images: any)=>{
                    // console.log(files)
                    setImageList(images);
                    readImageFromLocalFile(images.map((val: any)=>{
                      return val?.originFile
                    }))
                  }}
                  autoUpload={false}
                  showUploadList={false}
                >
                  <Button type='primary' style={{padding: '0 10px'}}>
                    <IconUpload />
                  </Button>
                </Upload>
              }
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
              // disabled={widthDisable}
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
          <Checkbox
            checked={canvasStyle?.width===detail?.width}
            onChange={(checked: any) =>{
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
              // disabled={heightDisable}
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
          <Checkbox
            checked={canvasStyle?.height===detail?.height}
            onChange={(checked: any) =>{
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
