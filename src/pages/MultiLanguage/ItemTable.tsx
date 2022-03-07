import { Button, Input, notification, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteStarlingItem, EditStarlingItem, GetStarlingList } from "../../apis";
import T from "../../apis/translate";

const ItemTable = ({
  languageData,
  setLanguageData,
  pagination,
  onPaginationChange,
  isLoading,
  doSearch,
}:{
  languageData: any[];
  setLanguageData: any;
  pagination: any;
  onPaginationChange: any;
  isLoading: any;
  doSearch: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<any>();
  const [ChineseValue, setChineseValue] = useState<any>();
  const [EnglishValue, setEnglishValue] = useState<any>();
  const [remark, setRemark] = useState<any>();
  const [machineTranslate, setMachineTranslate] = useState<any>();

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false))
  }, [refresh])

  const deleteItem = async (itemId: any) => {
    await DeleteStarlingItem(itemId).then(()=>{
      notification.success({ message: '删除成功' })
    });
    doSearch()
  }

  const editItem = async (itemId: any, itemKey: any) => {
    await EditStarlingItem({
      id: itemId,
      key: itemKey,
      chinese_text: ChineseValue,
      english_text: EnglishValue,
      remark,
      is_machine_translate: machineTranslate,
    }).then(async ()=>{
      notification.success({ message: '编辑成功' })
      doSearch()
      const res = await GetStarlingList({});
      const final = await GetStarlingList({page_num:1,page_size:res?.total || 20});
      localStorage.setItem('starling',JSON.stringify(final?.starList||[]));
      // setRefresh(true);
    });
    
  }

  const columns: any = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: `${T('multi_chineseText')}`,
      width: "22%",
      key: "Chinese",
      dataIndex: "chinese_text",
      render: (text: any, _: any, index: any) => {
        return(
          selectedIndex !== index ? text : (
            <Input 
              value={ChineseValue} 
              onChange={(e: any)=>setChineseValue(e.target.value)}
            />
          )
        )
      }
    },
    {
      title: `${T('multi_englishText')}`,
      width: "22%",
      key: "English",
      dataIndex: "english_text",
      render: (text: any, record: any, index: any) => {
        return (
          <>
            {selectedIndex !== index ? text : (
              <Input 
                value={EnglishValue} 
                onChange={(e: any)=>{
                  setEnglishValue(e.target.value);
                  setMachineTranslate(false)}
                }
              />
            )}
            {record.is_machine_translate && selectedIndex !== index ? (
              <span style={{
                background:'darkseagreen', 
                marginLeft:'5px',
                padding: '0 4px',
                color: 'white',
                fontSize: '12px',
              }}>MT</span>
            ) : null}
          </>
          
        )
      }
    },
    {
      title: `${T('multi_remark')}`,
      width: "22%",
      key: "remark",
      dataIndex: "remark",
      render: (text: any, _: any, index: any) => {
        return (
          selectedIndex !== index ? text : (
            <Input 
              value={remark} 
              onChange={(e: any)=>setRemark(e.target.value)}
            />
          )
        )
      }
    },
    {
      title: `${T('const_operation')}`,
      align: "center",
      width: "14%",
      key: "operation",
      render: (_: any, record: any, index: any) => {
        return (
          selectedIndex !== index ?
          <Space>
            <Button 
              size="small" 
              type="text"
              onClick={() => {
                setRefresh(true);
                setSelectedIndex(index);
                setChineseValue(record.chinese_text);
                setEnglishValue(record.english_text);
                setRemark(record.remark);
                setMachineTranslate(record.is_machine_translate);
              }}
            >
              {T('const_edit')}
            </Button>
            <Popconfirm
              title="确定删除该条内容，操作后无法撤回？"
              okText={T('const_ok')}
              cancelText={T('const_cancel')}
              placement="topRight"
              onConfirm={()=>{
                // console.log(record.id);
                deleteItem(record.id);
              }}
            >
              <Button size="small" type="text" danger>
                {T('const_delete')}
              </Button>
            </Popconfirm>
          </Space> :
          <Space>
          <Button 
            size="small" 
            type="text"
            onClick={() => {
              setSelectedIndex(null)
            }}
          >
            {T('const_cancel')}
          </Button>
          <Button 
            size="small" 
            type="link"
            onClick={() => {
              editItem(record.id,record.key);
              setSelectedIndex(null);
            }}
          >
            {T('const_ok')}
          </Button>
        </Space>
        );
      }
    },
    
  ];

  return (
    <>
      <Table
        rowKey={(row) => {
            return row.name;
        }}
        dataSource={languageData}
        columns={columns}
        loading={isLoading}
        pagination={{...pagination, onChange: onPaginationChange}}
      />
       
    </>
  )
}

export default ItemTable;