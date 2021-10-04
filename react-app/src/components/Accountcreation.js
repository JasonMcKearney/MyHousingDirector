import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Accountcreation.css'

import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
} from 'antd';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
export default class accountcreation extends Component {

    onFinish = (values) => {
        console.log('Success:', values);
        this.props.history.push('/home');
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {

        return (
            <Form>
                
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="sutdent_ID"
                    label="Student_ID"
                    tooltip="Every User Must have a User ID"
                    rules={[{ required: true, message: 'Please input a user ID', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="year"
                    label="Year:"
                    rules={[{ required: true, message: 'Please select the users Year' }]}
                >
                    <Select placeholder="select the users year">
                        <Option value="Freshman">Freshman</Option>
                        <Option value="Sophmore">Sophmore</Option>
                        <Option value="Junior">Junior</Option>
                        <Option value="Senior">Senior</Option>
                        <Option value="Masters+">Masters+</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dormnumber"
                    label="Dorm #number"
                    rules={[{ required: true, message: 'Please input your dormnumber!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                <Form.Item> 
                        <Button type="primary">
                            Open User-Form
                        </Button>
                </Form.Item>
                
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
        </Button>
                </Form.Item>
            </Form>

          


            );
    }

}