import { Divider, Form, Input, Tabs } from '@arco-design/web-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import StyleConfig from './StyleConfig';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const StyledTabs = styled(Tabs)`
  height: 700px;
  .arco-tabs-header-nav-line.arco-tabs-header-nav-vertical
    .arco-tabs-header-title {
    padding: 10px 15px;
    /* border: 1px solid #000000; */
    margin-top: 0px;
  }
  .arco-tabs-content-vertical {
    padding-left: 8px;
    /* padding-right: 10px; */
  }
  .arco-tabs-content {
    padding-top: 10px;
  }
`;

const StyledForm = styled(Form)`
.arco-form-item {
  margin-bottom: 14px;
}
`;

const Config = ({
  contentList,
  setContentList,
  // selectedKey,
  // setSelectedKey,
  selectedIndex,
  canvasStyle,
}: {
  contentList: any;
  setContentList: any;
  // selectedKey: any;
  // setSelectedKey: any;
  selectedIndex: any;
  canvasStyle: any;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log(contentList[selectedIndex]?.config);
    form?.setFieldsValue(contentList[selectedIndex]?.config);
  }, [selectedIndex]);

  const onConfigChange = (type: any, value: any, isStyle: boolean) => {
    if (isStyle) {
      contentList[selectedIndex].config.style[`${type}`] = value;
      setContentList([...contentList]);
      return;
    }
    contentList[selectedIndex].config[`${type}`] = value;
    setContentList([...contentList]);
  };

  return (
    <>
      <StyledForm form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <FormItem label="名称" style={{ marginTop: '10px' }} field="name">
          <Input
            style={{ width: '90%' }}
            onChange={(val: any) => {
              onConfigChange('name', val, false);
              if (!val) {
                form?.setFieldValue(
                  'name',
                  contentList[selectedIndex]?.config.type,
                );
              }
            }}
          />
        </FormItem>
        <StyledTabs key="line" tabPosition="top" lazyload={false}>
          <TabPane key="1" title="属性">
            <div style={{ marginTop: 20 }}>
              <StyleConfig
                // selectedKey={selectedKey}
                contentList={contentList}
                // setContentList={setContentList}
                selectedIndex={selectedIndex}
                form={form}
                onConfigChange={onConfigChange}
                canvasStyle={canvasStyle}
              />
            </div>
          </TabPane>
          <TabPane key="2" title="配置">
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              Content of Tab Panel 2
            </div>
          </TabPane>
        </StyledTabs>
        <Divider style={{ margin: 0 }} />
      </StyledForm>
    </>
  );
};

export default Config;
