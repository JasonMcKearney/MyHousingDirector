import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, createFromIconfontCN } from '@ant-design/icons';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import  nav1  from './nav1';
import './Home.css';
import { LinkContainer } from 'react-router-bootstrap';

const { Header, Content, Footer, Sider } = Layout;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2846432_0s4wy6kbmr7c.js',
});

export class Home extends Component {

    state = { buttonState: false};

    render() {
        return (
            <div className="home_box">

                <Layout style={{ height: '100%' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" icon={<IconFont style={{ fontSize: 30 }} type="icon-zhuye" />}>
                                <Link to="/home/nav1">nav 1</Link>
                            
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            
                                <Link to="/home/nav2">nav 2</Link>
                        </Menu.Item>

                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            nav 3
                          </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined />}>
                            nav 4
                         </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
                                <Switch>
                               
                                    <Route path='/home/nav1' component={nav1}  /> 
                                    <Route path='/home/nav2' render={() => { return (<h1>nav2</h1>) }} /> 
                                    <Route path='/home/nav3' render={() => { return (<h1>nav3</h1>) }} /> 
                                    <Route path='/home/nav4' render={() => { return (<h1>nav4</h1>) }} /> 
                                    <Route path='/home' component={nav1} /> 
                               
                                </Switch>
                            
                            
        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
                </Layout>
            </div>
        );
    }
}





    