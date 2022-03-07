import React, { FC, useEffect } from 'react';
import { Router as RouterWrap } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Router } from './Router';
import { Button, Layout } from 'antd';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import './App.css';
import "@arco-design/web-react/dist/css/arco.css";
import { GetStarlingList } from './apis';

const { Sider, Content } = Layout;

const bsHistory = createBrowserHistory();

const App: FC = () => {
  useEffect(()=>{
    const cacheLanguage = async () => {
      const res = await GetStarlingList({});
      const final = await GetStarlingList({page_num:1,page_size:res?.total || 20});
      localStorage.setItem('starling',JSON.stringify(final?.starList||[]));
    }
    cacheLanguage();
  },[])

  return (
    <RouterWrap history={bsHistory}>
      <Layout style={{ minWidth: 1440 }}>
        <Header />
        <Layout>
          <Sider width="120px">
            <SideMenu />
          </Sider>
          <Content
            style={{
            background: 'transparent',
            padding: '24px 24px 24px 48px',
            }}>
           <Router />
           
          </Content>
        </Layout>
      </Layout>
    </RouterWrap>
  );
};

export default App;