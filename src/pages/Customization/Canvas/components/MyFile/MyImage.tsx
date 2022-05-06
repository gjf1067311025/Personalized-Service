import React from 'react';
// import { Image } from '@arco-design/web-react';
import avatarDef from '../../../../../icons/default_picture.png';
import '../index.css';

const MyImage = ({ config }: { config: any }) => {
  return (
    <img
      className="my-image"
      src={config?.image_url || avatarDef}
      draggable={false}></img>
  );
};

export default MyImage;
