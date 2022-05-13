import React from 'react';
// import { Image } from '@arco-design/web-react';
import avatarDef from '../../../../../icons/qr_code.png';
import '../index.css';
import QRCode from 'qrcode.react';

const MyQrCode = ({ config,testData, }: { config: any; testData: any }) => {
  return (
  //   <img
  //     className="my-qrcode"
  //     src={testData?.[config?.image_url as keyof typeof testData] || avatarDef}
  //     draggable={false}></img>
  // <div className='my-qrcode'>
    <QRCode
      // className="my-qrcode"
      value={testData?.[config?.image_url as keyof typeof testData]}
      // value={`${detail.uniqueKey}`}
      size={Number(config?.width?.split('px')?.[0])}
      fgColor="#000000" //二维码的颜色
    />
  // </div>
  
  );
};

export default MyQrCode;
