import { Grid, Image, Skeleton } from '@arco-design/web-react';
import React from 'react';
// import styled from 'styled-components';
import avatarDef from '../../../../icons/default_picture.png';
import qrCodeImg from '../../../../icons/qr_code.png';
import './index.css';

const { Row, Col } = Grid;

const SingleTool = ({
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
          <Image
            src={avatarDef}
            preview={false}
            simple={true}
            draggable={false}
          />,
          '图片',
          'Image',
        )}
      </Col>
      <Col span={12}>{getCard(<Skeleton />, '文字', 'Text')}</Col>
      <Col span={12}>
        {getCard(
          <Image
            src={qrCodeImg}
            preview={false}
            simple={true}
            draggable={false}
          />,
          '二维码',
          'QRCode',
        )}
      </Col>
      <Col span={12}>
        {getCard(
          <Skeleton text={{rows:3, width:'100%'}}/>,
          '列表',
          'List')}
      </Col>
    </Row>
  );
};

export default SingleTool;
