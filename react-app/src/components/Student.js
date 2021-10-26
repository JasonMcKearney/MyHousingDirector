﻿import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './Student.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export class Student extends Component {

  render() {

    return (
      <Layout style={{ height: '100%' }}>
        <Menu className="Student-nav-bar" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">nav 1</Menu.Item>
          <Menu.Item key="3">nav 2</Menu.Item>
        </Menu>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '40px 0' }}>
          </Breadcrumb>
          <Layout className="Student-page-background" style={{ height: '100%' }}>
            <Sider className="Student-page-Sider">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    );

  }


}




