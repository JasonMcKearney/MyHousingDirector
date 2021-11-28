﻿import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, Carousel } from 'antd';
import logo from '../img/logo.png';
import loginpic1 from '../img/loginpic1.png';
import loginpic2 from '../img/loginpic2.JPG';
import loginpic3 from '../img/loginpic3.JPG';
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
import Cookies from 'js-cookie'

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

class LogIn extends Component {

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
        Cookies.set("username", event.target.value);
    }
    password(event) {
        this.setState({ password: event.target.value })
    }
    login(event) {
        // Student Login in...
        fetch('http://localhost:16648/api/Student/api/DStudent/Login', {
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
                if (result.status === "Invalid") {
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
                            if (result.status === "Invalid") {
                                this.props.history.push('/LogIn')
                                alert("Invalid username or password");
                            }
                            else {
                                this.props.updateUserinfo({
                                    username: this.state.username,
                                    pwd: this.state.password
                                });

                                this.props.history.push('/home')
                            }
                        })
                }
                else {

                    this.props.updateUserinfo({
                        username: this.state.username,
                        pwd: this.state.password
                    });
                    // Bring to student page
                    this.props.history.push('/Student/home')
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
                                    <img src={loginpic3} className="carouselItemTopImg" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="2">
                                <div className="carouselItem">
                                    <div className="carouselItemTop">
                                        <img src={loginpic2} className="carouselItemTopImg" />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide key="3">
                                <div className="carouselItem">
                                    <div className="carouselItemTop">
                                        <img src={loginpic1} className="carouselItemTopImg" />
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
                            <a>Forgot password</a>
                        </div>
                    </Form>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(LogIn);