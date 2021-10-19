import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Carousel } from 'antd';
import logo from '../img/logo.png';
import dormpicture from '../img/dormpicture.png';
import './LogIn.css'

import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, {
    Pagination,
    Autoplay
} from 'swiper/core';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import Password from 'antd/lib/input/Password';
import axios from 'axios'


// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);
export class LogIn extends Component {

    constructor() {
        super();
 
        this.state = {
            username: '',
            password: ''
        }
 
        this.password = this.password.bind(this);
        this.username = this.username.bind(this);
        this.login = this.login.bind(this);
    }

    username(event) {
        this.setState({ username: event.target.value })
    }
    password(event) {
        this.setState({ password: event.target.value })
    }
    login(event) {
        // Student Login in...
        fetch('http://localhost:16648/api/DStudent/api/DStudent/Login', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status === "Invalid")
                {
                        // Admin Log in...
                        fetch('http://localhost:16648/api/Admin/Login', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                username: this.state.username,
                                password: this.state.password
                            })
                        }).then((Response) => Response.json())
                            .then((result) => {
                                if (result.status === "Invalid")
                                {
                                    this.props.history.push('/LogIn')
                                    alert("Invalid username or password");
                                }
                                else
                                {
                                    this.props.history.push('/home')
                                    alert("Welcome Admin!");
                                }
                            })
                }
                else
                {
                    // Bring to student page
                    this.props.history.push('/home')
                    alert("Welcome Student!");
                }
            })
    }

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
                    <div style={{
                        width: '100%',
                        height: '100%'
                    }}>
                        <Swiper autoplay={{
                            delay: 19000,
                            disableOnInteraction: false,
                        }} pagination={true}>
                            <SwiperSlide key="1">
                                <div className="carouselItem">
                                    <img src={dormpicture} className="carouselItemTopImg" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="2">
                                <div className="carouselItem">
                                    <div className="carouselItemTop">
                                        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic15.nipic.com%2F20110811%2F8029346_082444436000_2.jpg&refer=http%3A%2F%2Fpic15.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635210128&t=8e283b98e9acd56e9adcb990642ee1aa" className="carouselItemTopImg" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
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
                            rules={[{ required: true, message: 'Please input your username!' }]}                        >
                            <Input type="text" onChange={this.username} placeholder="username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            //Input= {type="text"  this.state.Password}
                        >
                            <Input.Password type="text" onChange={this.password} placeholder="password" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button onClick={this.login} 
                                type="primary" htmlType="submit">
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
                </form> 


                //--------------------- ButtonClick in order to go to login function above--------------
                <Button onClick={this.login} 
                                               type="primary" htmlType="submit">
                                Submit
                            </Button>
                
                */}
            </div>
        );
    }
}
