/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { GetItemByKey, GetStarlingList } from "../../apis";
import T from "../../apis/translate";
import AddModal from "./AddModal";
import ItemSearch from "./ItemSearch";
import ItemTable from "./ItemTable";


const MultiLanguage: FC = () => {
  const [languageData, setLanguageData] = useState<any[]>();
  const [pagination, setPagination] = useState<any>({
    showTotal: (total: any) => 
      localStorage.getItem('lang') === 'en'?`Total ${total}` :`共 ${total} 条`,
    total: 0,
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
  });
  const [searchKey, setSearchKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const test = async () => {
    var new_date: any = new Date();
    for(var i = 0; i < 10000; i++) {
      await GetItemByKey({key:['const_add'],lang:'zh'});
    }
    var old_date: any = new Date();
    var difftime: any = (old_date - new_date)/1000;
    console.log("时间差是: "+difftime);

    var new_date2: any = new Date();

    for(var j = 0; j < 10; j++) {
      await T('const_add');
    }

    var old_date2: any = new Date();
    var difftime2: any = (old_date2 - new_date2)/1000;
    console.log("时间差是: "+difftime2);
  }

  useEffect(()=>{
    // test();
    doSearch();
    setPagination({
      showTotal: (total: any) => 
        localStorage.getItem('lang') === 'en'?`Total ${total}` :`共 ${total} 条`,
      total: 0,
      current: 1,
      pageSize: 20,
      showSizeChanger: true,
    })
  },[])

  useEffect(()=>{
      doSearch();
  },[searchKey])

  const doSearch = async (pageNumber?: number, pageSize?: number) => {
    const interface_input = {
      page_num: pageNumber || 1,
      page_size: pageSize || pagination.pageSize,
      search_key: searchKey,
    }
    setIsLoading(true);
    const res = await GetStarlingList({...interface_input});
    // console.log(res);
    // const res = await axios.get('http://127.0.0.1:8000/api/starling',{params:{},headers:{}});
    pagination.current = pageNumber || 1;
    pagination.pageSize = pageSize || pagination.pageSize;
    pagination.total = res?.total;
    setLanguageData(res?.starList);
    setPagination(pagination);
    setIsLoading(false);
  }

  const onPaginationChange = (pageNumber: number, pageSize: number) => {
    doSearch(pageNumber, pageSize);
  }

  return (
    <div style={{ marginTop:50 }}>
      <ItemSearch 
        searchKey={searchKey} 
        setSearchKey={setSearchKey}
        setShowModal={setShowModal}
      />
      <ItemTable 
        languageData={languageData || []}
        setLanguageData={setLanguageData}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        isLoading={isLoading}
        doSearch={doSearch}
      />
      <AddModal
        showModal={showModal}
        setShowModal={setShowModal}
        doSearch={doSearch}
      />
    </div>
  )
}

export default MultiLanguage;