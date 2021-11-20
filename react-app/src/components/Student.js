import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Button, Form, Modal, Input } from 'antd';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './Student.css';
import Cookies from 'js-cookie';
import DormSelection from './DormSelection'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


class Student extends Component {
  constructor(props){
    super(props);
  /*  fetch('http://localhost:16648/api/Student/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: Cookies.get("username")
            })
          }).then((Response) => Response.json())
          .then((result) => {
              var ID = result.studentID;
              var firstName = result.firstName;
              var lastName = result.lastName;

              Cookies.set("ID", ID);
              Cookies.set("FN", firstName);
              Cookies.set("LN", lastName);
            })*/
    }

    state = {
        showModal: false
    }

/*    componentDidMount() {
        console.log("this.props = ", this.props.userinfo)
        let { username, pwd } = this.props.userinfo;
        if (pwd == 'george') {
            this.setState({
                showModal: true
            })
        }
    }*/


    render() {
        let { showModal } = this.state;
        return (
            <Layout style={{ height: '100%' }}>
                <div>
                    <Modal title="Change Your password" visible={showModal} onOk={() => {
                    }} onCancel={() => {
                        this.setState({
                            showModal: false
                        })
                    }}>
                        <div>
                            <Form.Item
                                name="Old password"
                                label="Old Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" onChange={this.password} />
                            </Form.Item>

                            <Form.Item
                                name=" New password"
                                label="New Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" onChange={this.password} />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm New Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your new password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('New password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input type="text" onChange={this.confirmpassword} />
                            </Form.Item>

                        </div>
                    </Modal>
                        <Menu className="Student-nav-bar" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to="/student/home">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                            <Link to="/student/DormSelect">Dorm Selection</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/student/nav2">User Info</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                              <Button onClick={() => {
                                  Cookies.remove('ID')
                                  Cookies.remove('username')
                                  this.props.history.push('/LogIn');
                              }} type="primary" htmlType="Logout">
                                  Logout
                              </Button>
                            </Menu.Item>
                        </Menu>
                        
                        <div>
                            

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
                                            <Route path='/student/DormSelect' component={DormSelection} />
                                            <Route path='/student/nav2' render={() => { return (<h1>User Info</h1>) }} />
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





const mapStateToProps = (state) => {
    return {
        userinfo: state.userinfo
    }
}

const mapDispatchToProps = (
    dispatch,
    ownProps
) => {
    return {
        updateUserinfo(payload) {
            dispatch({
                type: 'UPDATE_USERINFO',
                payload
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Student);