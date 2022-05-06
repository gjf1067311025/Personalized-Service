import { Menu } from '@arco-design/web-react';
import { IconArrowDown, IconArrowUp, IconDelete } from '@arco-design/web-react/icon';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const MenuItem = Menu.Item;

const StyledMenu = styled(Menu)`
  .arco-menu-inner {
    padding: 0;
  }
  .arco-menu-item {
    margin: 0;
  }
`;

const ContentList = ({
  contentList,
  setContentList,
  selectedKey,
  setSelectedKey,
}: {
  contentList: any[];
  setContentList: any;
  selectedKey: any;
  setSelectedKey: any;
}) => {
  useEffect(()=>{setSelectedKey([...contentList]?.reverse()?.[0]?.key)},[contentList?.length])

  return (
    <>
      <StyledMenu
        mode="vertical"
        selectedKeys={[selectedKey]}
        onClickMenuItem={(key: any) => {
          setSelectedKey(key);
        }}>
        {[...contentList]?.reverse().map((val: any, index: any) => {
          return (
            <MenuItem key={val?.key}>
              <div  style={{ textAlign: 'left', width:'70%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                图层{contentList?.length - index} : {val?.config?.name}
                <span style={{ position:'absolute', right:8 }}>
                  {selectedKey===val?.key && index !== 0?<IconArrowUp 
                    style={{marginRight:8}}
                    onClick={()=>{
                      const list = [...contentList].reverse();
                      list.splice(index-1,1,...list.splice(index, 1 , list[index-1]));
                      setContentList([...list.reverse()])
                    }}
                  />:null}
                  {selectedKey===val?.key && index !== contentList?.length-1?<IconArrowDown 
                    style={{marginRight:8}}
                    onClick={()=>{
                      const list = [...contentList].reverse();
                      list.splice(index+1,1,...list.splice(index, 1 , list[index+1]));
                      setContentList([...list.reverse()])
                    }}
                  />:null}
                  {selectedKey===val?.key?<IconDelete
                    style={{marginRight:8}}
                    onClick={()=>{
                      const list = [...contentList].reverse();
                      list.splice(index,1);
                      setContentList([...list.reverse()])
                      // setSelectedKey(undefined)
                    }}
                  />:null}
                </span>
                
              </div>
              
            </MenuItem>
          );
        })}
      </StyledMenu>
    </>
  );
};

export default ContentList;
