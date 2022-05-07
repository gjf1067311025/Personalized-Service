import React from 'react';
// import { Image } from '@arco-design/web-react';
import avatarDef from '../../../../../icons/qr_code.png';
import '../index.css';

const MyQrCode = ({ config,testData, }: { config: any; testData: any }) => {
  return (
    <img
      className="my-qrcode"
      src={testData?.[config?.image_url as keyof typeof testData] || avatarDef}
      draggable={false}></img>
  );
};

export default MyQrCode;
