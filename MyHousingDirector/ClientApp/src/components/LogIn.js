import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import logo from '../img/logo.png';
import dormpicture from '../img/dormpicture.png';
import './LogIn.css'


export class LogIn extends Component {

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {

        return (
            <div className="box">
                <div className="box-left">
                    <div className="imgBox-left">
                        <img src={dormpicture} className="dormpicture" />
                    </div>

                </div>
                <div className="box-right">
                    <div className="imgBox-right">
                        <img src={logo} className="logo" />
                    </div>
                  
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                        className="form"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="password" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                        <div>
                            <a>Forget password</a>
                        </div>
                    </Form>
                </div>

                {/* <form className= 'login-box' >
                    <label className = 'label '>
                        Email:
                        
                    </label>
                    <input className='input-box' type="text" name="email" />
                    <label className='label'>
                        Password:
                       
                    </label>
                    <input className='input-box' type="password" name="password" />
                    <input type="submit" value="Submit" />
                </form> */}
            </div>
        );
    }
}
