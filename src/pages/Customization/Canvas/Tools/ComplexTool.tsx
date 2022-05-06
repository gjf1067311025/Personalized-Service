import { Grid, Image, Skeleton } from '@arco-design/web-react';
import React from 'react';
// import styled from 'styled-components';
import avatarDef from '../../../../icons/default_picture.png';
import qrCodeImg from '../../../../icons/qr_code.png';
import './index.css';
import styled from 'styled-components';

const { Row, Col } = Grid;

const StyledSkeleton = styled(Skeleton)`
  .arco-skeleton-content {
    margin-bottom: 3px;
  }
`;

const ComplexTool = ({
    getCard,
    contentList,
    setContentList,
    setSelectedKey,
    setSelectedIndex,
  }: {
    getCard: any;
    contentList: any[];
    setContentList: any;
    setSelectedKey: any;
    setSelectedIndex: any;
}) => {
  return (
    <Row>
      <Col span={12}>
        {getCard(
          <>
            <div style={{textAlign:'left'}}>
              <Image
                color='f2f3f5'
                width={30}
                src={avatarDef}
                preview={false}
                simple={true}
                draggable={false}
              />
            </div> 
            <StyledSkeleton style={{height:50, marginTop: 10}}/>
          </>,
          '图文',
          'ImageText',
        )}
      </Col>
      <Col span={12}>
        {getCard(
          <>
            <Skeleton text={{rows:1}}/>
            <Skeleton text={{rows:1, width:'100%'}} style={{marginTop: 10}}/>
            <Skeleton text={{rows:1}} style={{marginTop: 10}}/>
            <Skeleton text={{rows:1, width:'100%'}} style={{marginTop: 10}}/>
          </>,
          '表单',
          'Form')}
      </Col>
      <Col span={12}>
        {getCard(
          <Skeleton text={{rows:3, width:'100%'}}/>,
          '列表',
          'List')}
      </Col>
      <Col span={12}>
        {getCard(
          <>
            <div>
              <Image
                color='f2f3f5'
                width={40}  
                src={avatarDef}
                preview={false}
                simple={true}
                draggable={false}
              />
            </div>
            <div style={{marginTop:10}}>
              <Image
                color='f2f3f5'
                width={40}  
                src={avatarDef}
                preview={false}
                simple={true}
                draggable={false}
              />
            </div>
          </>,
          '组合图片',
          'Images',
        )}
      </Col>
    </Row>
  );
};

export default ComplexTool;
