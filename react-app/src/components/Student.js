import React, { Component } from 'react';
import {
    Layout, Menu, Breadcrumb, Button, Form
} from 'antd';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './Student.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export class Student extends Component {

    render() {

        return (
            <Layout style={{ height: '100%' }}>
                <div style={{
                    background:'#47F84E',
                    display: 'flex',
                    alignItems: 'center'

                }}>
                    <Menu style={{
                        flex: 1
                    }} className="Student-nav-bar" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/student/home">home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/student/nav1">nav1</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/student/nav2">nav2</Link>
                        </Menu.Item>

                    </Menu>
                    <div>
                        <Button onClick={() => {
                            this.props.history.push('/LogIn');
                        }} type="primary" htmlType="Logout">
                            Logout
                        </Button>

                    </div>
                </div>



                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '40px 0' }}>
                    </Breadcrumb>
                    <Layout className="Student-page-background" style={{ height: '100%' }}>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div className="Student-content-background" style={{ padding: 24, height: '100%' }}>
                                <Switch>

                                    <Route path='/student/Home' render={() => { return (<h1>Home</h1>) }} />
                                    <Route path='/student/nav1' render={() => { return (<h1>nav1</h1>) }} />
                                    <Route path='/student/nav2' render={() => { return (<h1>nav2</h1>) }} />
                                    <Route path='/student' render={() => { return (<h1>Home</h1>) }} />

                                </Switch>


                            </div>

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        );

    }


}





