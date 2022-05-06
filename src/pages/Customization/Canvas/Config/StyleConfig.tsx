// import { Input, Form } from '@arco-design/web-react';
import React from 'react';
import ImageStyle from '../components/Style/ImageStyle';
import ListStyle from '../components/Style/ListStyle';
import QrcodeStyle from '../components/Style/QrcodeStyle';
import TextStyle from '../components/Style/TextStyle';

// const FormItem = Form.Item;

const StyleConfig = ({
  // selectedKey,
  contentList,
  // setContentList,
  selectedIndex,
  form,
  onConfigChange,
  canvasStyle,
}: {
  // selectedKey: any;
  contentList: any;
  // setContentList: any;
  selectedIndex: any;
  form: any;
  onConfigChange: any;
  canvasStyle: any;
}) => {
  if (contentList[selectedIndex]?.config?.type === 'Image') {
    return (
      <>
        <ImageStyle
          onConfigChange={onConfigChange}
          detail={contentList[selectedIndex]?.config}
          canvasStyle={canvasStyle}
        />
      </>
    );
  } else if (contentList[selectedIndex]?.config?.type === 'Text') {
    return (
      <TextStyle
        onConfigChange={onConfigChange}
        form={form}
        detail={contentList[selectedIndex]?.config}
      />
    );
  } else if (contentList[selectedIndex]?.config?.type === 'QRCode') {
    return (
      <QrcodeStyle
        onConfigChange={onConfigChange}
        detail={contentList[selectedIndex]?.config}
      />
    );
  } else if (contentList[selectedIndex]?.config?.type === 'List') {
    return (
      <ListStyle
        onConfigChange={onConfigChange}
        form={form}
        detail={contentList[selectedIndex]?.config}
      />
    );
  } else {
    return null;
  }
};

export default StyleConfig;
