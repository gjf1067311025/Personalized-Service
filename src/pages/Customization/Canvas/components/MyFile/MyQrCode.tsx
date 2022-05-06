import React from 'react';
// import { Image } from '@arco-design/web-react';
import avatarDef from '../../../../../icons/qr_code.png';
import '../index.css';

const MyQrCode = ({ config }: { config: any }) => {
  return (
    <img
      className="my-qrcode"
      src={config?.image_url || avatarDef}
      draggable={false}></img>
  );
};

export default MyQrCode;
