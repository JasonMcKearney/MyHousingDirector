import React, { Component } from 'react';
import { Layout, Menu, Form, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import accountcreation from './Accountcreation';
import Search from './Search';
import './Home.css';
import { StudentProfile } from './StudentProfile';
import { AdminDashboard } from './AdminDashboard';
import {AdminDormRequests} from './AdminDormRequests';

import Homepagelogo from '../img/logo.png';

import Cookies from "js-cookie";

const { Header, Content, Footer, Sider } = Layout;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2846432_1h7nk13g669.js',
});
const UserIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2846432_1h7nk13g669.js',
});

export class Home extends Component {

    state = { buttonState: false, page:''};

    setVariables(v){
        this.setState(this.state.page = v);
        console.log("Page: " + this.state.page)
    }
    render() {
        return (
            <div className="home_leftbox">

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
                        <div className="Homepagelogo" >
                            <img src={Homepagelogo} className="Homepagelogo" />
                        </div>

                        <div className="Homepagecontent" style={{ padding: 24, minHeight: 50 }}>
                            Welcome, { Cookies.get("username") }
                        </div>
                

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" icon={<UserIcon style={{ fontSize: 30 }} type="icon-yonghu" />}>
                            <Link to="/home/AdminDashboard">My Dashboard</Link>     
                        </Menu.Item>
                        <Menu.Item key="2" icon={<IconFont style={{ fontSize: 30 }} type="icon-zhuye" />}>
                                <Link to="/home/Search">Search for user</Link>
                        </Menu.Item>
                        
                        <Menu.Item key="3" icon={<UserIcon style={{ fontSize: 30 }} type="icon-yonghu" />}>
                            <Link to="/home/Accountcreation">Create new user</Link>     
                        </Menu.Item>
                    </Menu>


                        <Form.Item Logout={{ offset: 8, span: 16 }}>
                            <Button onClick={() => {
                                Cookies.remove('UD')
                                Cookies.remove('FN')
                                Cookies.remove('username')
                                Cookies.remove('LN')
                                Cookies.remove('Question10')
                                Cookies.remove('Question9')
                                Cookies.remove('EM')
                                Cookies.remove('ID')
                                Cookies.remove('survey')
                                Cookies.remove('Question6')
                            this.props.history.push('/LogIn');
                            }} type="primary" htmlType="Logout">
                                Logout
                            </Button>

                        </Form.Item>
                </Sider>
                <Layout>
                    <Header className="Admin-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0' }}>
                        <div className="Admin-content-background" style={{ padding: 24, height: '100%' }}>
                                <Switch> 
                                    <Route path='/home/Search' component = {Search} /> 
                                    <Route path='/home/Accountcreation' component={accountcreation} /> 
                                    <Route path='/home/nav3' render={() => { return (<h1>nav3</h1>) }} /> 
                                    <Route path='/home/nav4' render={() => { return (<h1>nav4</h1>) }} /> 
                                    <Route path='/home/StudentProfile' component ={StudentProfile}/>
                                    <Route path='/User_Form' render={() => { return (<h1>nav1</h1>) }} />  
                                    <Route path='/home/AdminDashboard' component ={AdminDashboard}/>   
                                    <Route path='/home/AdminDormRequests' component = {AdminDormRequests}/>                               
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