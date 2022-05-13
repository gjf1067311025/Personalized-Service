import React from 'react';
// import styled from 'styled-components';
import MyImage from '../components/MyFile/MyImage';
import MyList from '../components/MyFile/MyList';
import MyQRCode from '../components/MyFile/MyQrCode';
import MyText from '../components/MyFile/MyText';
import './index.css';

const ShowContent = ({
  contentList,
  canvasStyle,
  testData,
  father,
}: {
  contentList: any[];
  canvasStyle: any;
  testData: any;
  father?: any;
}) => {
  
  const getContent = (value: any) => {
    if (value?.config?.type === 'Image') {
      return <MyImage config={value?.config} />;
    } else if (value?.config?.type === 'Text') {
      return <MyText config={value?.config} testData={testData}/>;
    } else if (value?.config?.type === 'QRCode') {
      return <MyQRCode config={value?.config} testData={testData}/>;
    } else if (value?.config?.type === 'List') {
      return <MyList config={value?.config} testData={testData}/>;
    } else {
      return null;
    }
  };

  return (
    <div
      id="content"
      style={{
        width: '100%',
        minHeight: '60%',
        maxHeight: '90%',
        // background: 'white',
        overflow: 'auto',
      }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'white',
          ...canvasStyle,
        }}
        id={father?`father${father}`:"father"}>
        {[...contentList]?.map((val: any) => {
          return (
            <div
              style={{
                border:'unset',
                position: 'absolute',
                width: val?.config?.width || 100,
                height: val?.config?.height || 100,
                top: val?.config?.top || 0,
                left: val?.config?.left || 0,
                right: val?.config?.top || 'unset',
                bottom: val?.config?.bottom || 'unset',
                // background: '#b9b9b9',
              }}
              key={val?.key}
              id={val?.key}>
              {getContent(val)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowContent;
