import { Button, Input, Modal, Form, Col, Row, notification, Checkbox, Popover } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { AddStarlingItems, JudgeExist, GetTranslation } from "../../apis";
import T from "../../apis/translate";

const FormItem = Form.Item;
const FormList = Form.List;

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 24px 24px 10px 24px;
  }
`;

const AddModal = (
{
  showModal,
  setShowModal,
  doSearch,
}:
{
  showModal: any;
  setShowModal: any;
  doSearch: any;
}
) => {
  const [form] = Form.useForm();

  const [checked, setChecked] = useState<boolean>(false);

  const reset = () => {
    form?.resetFields();
    setChecked(false);
    const addItemList = [0,1,2,3,4].map(()=>{
      return {
        'key':'',
        'chinese':'',
        'english':'',
        'remark':'',
        'is_machine_translate':false,
      }
    })
    form?.setFieldsValue({
      'addItems': addItemList,
    });
  }

  useEffect(()=>{
    reset();
  },[])

  const addItems = async () => {
    const items = form?.getFieldsValue()?.addItems;
    const finalItems = items?.filter((item: any) => {
      return item.key && item.chinese_text;
    });
    console.log(finalItems);
    if(finalItems?.length === 0) {
      notification.success({ message: '无新增文案' })
      doSearch();
      reset();
      setShowModal(false);
      return;
    }
    await AddStarlingItems({
      basic_info: finalItems
    }).then(()=>{
      notification.success({ message: '添加成功' })
      doSearch();
      reset();
      setShowModal(false);
    }).catch (() => {
      notification.error({message: '请检查错误'})
    });
  }

  return (
    <StyledModal
      title={T('const_add')}
      width={1000}
      visible={showModal}
      footer={[
        <>
          <Popover content="选中后，未填写英文时，将自动翻译中文">
            <Checkbox checked={checked} onChange={()=>{
              const items = form?.getFieldValue('addItems');
              form?.setFieldsValue({
                'addItems': items?.map((item: any) => {
                  return {...item,is_machine_translate: !checked}
                }),
              })
              setChecked(!checked)
            }}>
              {T('multi_machineTranslate')}
            </Checkbox>
          </Popover>
          <Button key="back" onClick={()=>{
            reset();
            setShowModal(false);
          }}>
            {T('const_cancel')}
          </Button>,
          <Button key="submit" type="primary" onClick={()=>{
            addItems();
          }}>
            {T('const_ok')}
          </Button>
        </>
      ]}
      onCancel={()=>{
        reset();
        setShowModal(false);
      }}
    >
      <div style={{height:380, overflow:'auto'}}>
        <div style={{marginBottom: 16}}>
          <Row>
            <Col span={5}>
              <div style={{margin:'0 2%' }} >Key</div>
            </Col>
            <Col span={7}>
              <div style={{margin:'0 2%' }} >{T('multi_chineseText')}</div>
            </Col>
            <Col span={7}>
              <div style={{margin:'0 2%' }} >{T('multi_englishText')}</div>
            </Col>
            <Col span={5}>
              <div style={{margin:'0 2%' }} >{T('multi_remark')}</div>
            </Col>
          </Row>
        </div>
        
        <Form autoComplete="off" form={form}>
          <FormList name="addItems">
            {(fields, { add }) => (
              <>
                {fields.map(({ key, name, ...restField }, index: any) => (
                  <Row>
                    <Col span={5}>
                      <FormItem
                        {...restField}
                        name={[name, 'key']}
                        rules={[
                          ()=> ({
                            async validator(_, value) {
                              if(!value) return Promise.resolve();
                              const res = await JudgeExist({key:value});
                              if(!res?.is_exist) {
                                return Promise.resolve();
                              }
                              return Promise.reject("不能输入已存在的key值");
                            },
                          }),
                        ]}
                      >
                        <Input placeholder={T('multi_enterKey')} style={{width:'96%'}} />
                      </FormItem>
                    </Col>
                    <Col span={7}>
                      <FormItem
                        {...restField}
                        name={[name, 'chinese_text']}
                      >
                        <Input
                          placeholder="请输入中文文案"
                          style={{width:'96%'}}
                          onBlur={async () => {
                            const items = form?.getFieldValue('addItems');
                            if(!checked) return;
                            if(!items[index].is_machine_translate) return;
                            if(!items[index].chinese_text) return;
                            console.log(items[index].chinese_text)
                            const res = await GetTranslation(items[index].chinese_text)
                            items[index].english_text = res?.text;
                            form?.setFieldsValue({
                              'addItems': items,
                            })
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col span={7}>
                      <FormItem
                        {...restField}
                        name={[name, 'english_text']}
                      >
                        <Input
                          placeholder="请输入英文文案"
                          style={{width:'96%'}} 
                          onChange={(e: any)=>{
                            const items = form?.getFieldValue('addItems');
                            if(!e.target.value) items[index].is_machine_translate = true;
                            else items[index].is_machine_translate = false
                            form?.setFieldsValue({
                              'addItems': items,
                            })
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col span={5}>
                      <FormItem
                        {...restField}
                        name={[name, 'remark']}
                      >
                        <Input placeholder="请输入备注" style={{width:'96%'}} />
                      </FormItem>
                    </Col>
                    <FormItem
                        {...restField}
                        name={[name, 'is_machine_translate']}
                        initialValue={checked}
                      >
                      </FormItem>
                  </Row>
                ))}
                <FormItem>
                  <Button
                    type="dashed" 
                    onClick={() => {
                      [0,1,2,3,4].forEach(()=>{add()});
                    }} 
                    block 
                    icon={<PlusOutlined />}
                  >
                    {T("multi_addMore")}
                  </Button>
                </FormItem>
              </>
            )}
          </FormList>
        </Form>
      </div>
    </StyledModal>
    
  )
}

export default AddModal;
