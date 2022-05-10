import {
    Form,
    Input,
    Popover,
    Grid,
    InputNumber,
    Radio,
    Checkbox,
    Button,
    Upload,
    Select,
  } from '@arco-design/web-react';
  import React, { useEffect, useState } from 'react';
  import styled from 'styled-components';
  import { ChromePicker } from 'react-color';
import { IconUpload } from '@arco-design/web-react/icon';
  
const FormItem = Form.Item;
const { TextArea } = Input;
const { Row, Col } = Grid;
const { Option } = Select
const StyledTextArea = styled(TextArea)`
    resize: none;
    /* -webkit-text-fill-color: black; */
    /* color: black; */
  `;
  
const ListStyle = ({
  form,
  detail,
  onConfigChange,
  fontList,
  setFontList,
}: //
{
  form: any;
  detail: any;
  onConfigChange: any;
  fontList: any;
  setFontList: any;
}) => {
  const [color, setColor] = useState<any>();
  const [fileList, setFileList] = useState<any>();
  useEffect(() => {
      setColor(detail?.style?.color || form?.getFieldValue('color') || '#000000');
    }, [form]);
    const onChangeColor = (colorObj: any) => {
      setColor(colorObj.hex);
      onConfigChange('color', colorObj.hex, true);
      form?.setFieldValue('style.color', color);
    };

    const readFontFromLocalFile=(files: any) => {
      var fileReader = new FileReader()
      fileReader.readAsArrayBuffer(files[0])
      return new Promise(function(resolve, reject) {
          fileReader.onload = function (ev: any) {
              try {
                  var data = ev?.target.result
                  // console.log(data)
                  loadFont({
                    cssValue: files[0].name?.split('.')?.[0],
                    arrayBuffer: data,
                  })
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
  
    const loadFont = (obj: any) => {
      let fontf=obj.cssValue;
      if(document.fonts&&!checkFont(obj.cssValue))
      {
          // let fontFace = new FontFace(obj.cssValue, 'url(C:/Users/lenovo/Desktop/fonttowoff2_toolnb_5477.woff2)');
          let fontFace = new FontFace(obj.cssValue, obj.arrayBuffer);
          fontFace.load().then((loadedFontFace: any) => {
              // console.log(loadedFontFace)
              document.fonts.add(loadedFontFace);
          }).catch(function(error) {
            console.log(error);// error occurred
          });;
          fontList.push(fontf)
          setFontList(fontList)
          onConfigChange('fontFamily', obj.cssValue, true);
      }
      setFileList([])
      
    }
    //检测字体文件是否已加载
    const checkFont = (name: any) => {
      let values=document.fonts.values();
      let isHave=false;
      let item=values.next();
      while(!item.done&&!isHave)
      {
          let fontFace=item.value;
          if(fontFace.family===name)
          {
              isHave=true;
          }
          item=values.next();
      }
      return isHave;
    }
  
    return (
      <>
        <Row>
          <Col span={24}>
            <FormItem label="文字" field="text">
              <StyledTextArea
                autoSize={false}
                style={{ width: '90%', height: '70px' }}
                onChange={(val: any) => {
                  onConfigChange('text', val, false);
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
              label="颜色" field="style.color"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
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
              label="行间距" field="style.lineHeight">
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
          <Col span={12}>
            <FormItem
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="字间距"
              field="">
              <InputNumber
                value={detail?.style?.letterSpacing?.split('px')[0]}
                style={{ width: '80%' }}
                onChange={(val: any) => {
                  onConfigChange('letterSpacing', `${val}px`, true);
                }}
                hideControl={true}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="位置1" field="style.textAlign">
              <Radio.Group onChange={(val: any) => {onConfigChange('textAlign', val, true)}} >
                <Radio value='left'>居左</Radio>
                <Radio value='center'>居中</Radio>
                <Radio value='right'>居右</Radio>
              </Radio.Group>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="位置2" field="TopBottom">
              <Radio.Group onChange={(val: any) => {
                  onConfigChange('TopBottom', val, false)
                }} >
                <Radio value='Top'>上对齐</Radio>
                <Radio value='Bottom'>下对齐</Radio>
              </Radio.Group>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="字体" field="./style.fontStyle">
              {/* <Button onClick={()=>{
                loadFont({
                  cssValue: '111',
                  url:'C:/Users/lenovo/Desktop/FZDiaoBSJW.TTF'
                })
              }}>111</Button> */}
              <Row>
                <Col span={18}>
                  <Select
                    allowClear={true}
                    value={detail?.style?.fontFamily}
                    onChange={(val: any)=>{
                      if(!val) onConfigChange('fontFamily', 'normal', true)
                      onConfigChange('fontFamily', val, true)
                  }}>
                    {fontList.map((option: any, index: any) => (
                      <Option key={option} value={`'${option}'`}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={6}>
                  <Upload
                    disabled={fileList?.length}
                    action='/' 
                    fileList={fileList}
                    onChange={(images: any)=>{
                      // console.log(files)
                      setFileList(images);
                      readFontFromLocalFile(images.map((val: any)=>{
                        return val?.originFile
                      }))
                    }}
                    autoUpload={false}
                    // showUploadList={false}
                  >
                    <Button type='primary' style={{padding: '0 10px'}}>
                      <IconUpload />
                    </Button>
                  </Upload>
                </Col>
              </Row>
            </FormItem>
          </Col>
           <Col span={24}>
            <FormItem label="样式" field="">
              {/* <CheckboxGroup> */}
                <Checkbox 
                  style={{marginRight:16}}
                  checked={detail?.style?.fontWeight==='bold'} 
                  onChange={(checked: any)=>{
                    if (checked) {onConfigChange('fontWeight', 'bold', true)}
                    else {onConfigChange('fontWeight', 'normal', true)}
                  }}
                >加粗</Checkbox>
                <Checkbox 
                  style={{marginRight:16}}
                  checked={detail?.style?.fontStyle==='italic'} 
                  onChange={(checked: any)=>{
                    if (checked) {onConfigChange('fontStyle', 'italic', true)}
                    else {onConfigChange('fontStyle', 'normal', true)}
                  }}
                >斜体</Checkbox>
                <Checkbox 
                  style={{marginRight:16}}
                  checked={detail?.style?.textDecoration==='underline'} 
                  onChange={(checked: any)=>{
                    if (checked) {onConfigChange('textDecoration', 'underline', true)}
                    else {onConfigChange('textDecoration', 'none', true)}
                  }}
                >下划线</Checkbox>
              {/* </CheckboxGroup> */}
            </FormItem>
          </Col>
        </Row>
      </>
    );
  };
  export default ListStyle;
  