import { Card, Divider, Tabs } from '@arco-design/web-react';
import React from 'react';
import styled from 'styled-components';
import ComplexTool from './ComplexTool';
import ContentList from './ContentList';
import SingleTool from './SingleTool';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  height: 400px;
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
`;

const StyledTabs2 = styled(Tabs)`
  height: 258px;
  .arco-tabs-header-nav-line.arco-tabs-header-nav-vertical
    .arco-tabs-header-title {
    padding: 10px 15px;
    /* border: 1px solid #000000; */
    margin-top: 0px;
  }
  .arco-tabs-content-vertical {
    padding-left: 0px;
    /* padding-right: 10px; */
  }
`;

const Tools = ({
  contentList,
  setContentList,
  selectedKey,
  setSelectedKey,
  // setRefresh,
  setSelectedIndex,
}: {
  contentList: any;
  setContentList: any;
  selectedKey: any;
  setSelectedKey: any;
  // setRefresh: any;
  setSelectedIndex: any;
}) => {
  const getCard = (innerValue: any, title: any, name: any) => {
    return (
      <Card
        onClick={() => {
          const timeKey = new Date().getTime().toString();
          contentList.push({
            key: `gaoUnique${timeKey}`,
            image_url: '',
            config: {
              type: name,
              image_url:'',
              name,
              text: name,
              width: '100px',
              height: '100px',
              top: '0px',
              left: '0px',
              right: 'unset',
              bottom: 'unset',
              TopBottom: 'Top',
              style: {
                fontSize: 14,
                lineHeight: 1.3,
                textAlign: 'left',
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none',
                letterSpacing:'0px'
              },
            },
          });
          setSelectedKey(`gaoUnique${timeKey}`);
          setSelectedIndex(contentList?.length - 1);
          setContentList([...contentList]);
        }}
        style={{ width: '80%', margin: 10, cursor: 'pointer', height: 150 }}
        className="card-custom-hover-style"
        hoverable={true}>
        <div style={{ height: '100px' }}>{innerValue}</div>
        <div style={{ marginTop: 5 }}>{title}</div>
      </Card>
    );
  };
  return (
    <>
      <div style={{ padding: '10px 15px' }}>组件库</div>
      <Divider style={{ margin: 0 }} />
      <StyledTabs key="line" tabPosition="left" lazyload={false}>
        <TabPane key="1" title="列表">
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <SingleTool
              getCard={getCard}
              contentList={contentList}
              setContentList={setContentList}
              setSelectedKey={setSelectedKey}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        </TabPane>
        {/* <TabPane key="2" title="组合">
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <ComplexTool
              getCard={getCard}
              contentList={contentList}
              setContentList={setContentList}
              setSelectedKey={setSelectedKey}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        </TabPane> */}
      </StyledTabs>
      <Divider style={{ margin: 0 }} />
      <StyledTabs2 key="line" tabPosition="left" lazyload={false}>
        <TabPane key="3" title="页面">
          <div
            style={{
              height: '258px',
              overflow: 'auto',
            }}>
            <ContentList
              contentList={contentList}
              setContentList={setContentList}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
            />
          </div>
        </TabPane>
      </StyledTabs2>
    </>
  );
};

export default Tools;
