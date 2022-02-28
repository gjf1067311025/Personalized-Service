import React, { FC, useEffect } from 'react';
import { Router as RouterWrap } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Router } from './Router';
import { Button, Layout } from 'antd';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import './App.css';
import "@arco-design/web-react/dist/css/arco.css";

const { Sider, Content } = Layout;

const bsHistory = createBrowserHistory();

const App: FC = () => {
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