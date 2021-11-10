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
    constructor() {
        super();
 
        this.state = {
            username: '',
            firstname: '',
            lastname:'',
            email: '',
            password: '',
            confirmpassword: '',
            gender: '',
            year:'',
            studentID:''
        }
 
        this.username = this.username.bind(this);
        this.firstname = this.firstname.bind(this);
        this.lastname = this.lastname.bind(this);
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.confirmpassword = this.confirmpassword.bind(this);
        this.gender = this.gender.bind(this);
        this.year = this.year.bind(this);
        this.studentID = this.studentID.bind(this);
        this.AddStudent = this.AddStudent.bind(this);
    }
    username(event) {
        this.setState({ username: event.target.value })
    }
    firstname(event) {
        this.setState({ firstname: event.target.value })
    }
    lastname(event) {
        this.setState({ lastname: event.target.value })
    }
    email(event) {
        this.setState({ email: event.target.value })
    }
    password(event) {
        this.setState({ password: event.target.value })
    }
    confirmpassword(event) {
        this.setState({ confirmpassword: event.target.value })
    }
    gender(event) {
        this.setState({ gender: event.target.value })
    }
    year(event) {
        this.setState({ year: event.target.value })
    }
    studentID(event) {
        this.setState({ studentID: event.target.value })
    }

    AddStudent(event) {
        // Admin add student account...
        fetch('http://localhost:16648/api/Admin/AddStudent', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                confirmpassword: this.state.confirmpassword,
                gender: this.state.gender,
                year: this.state.year,
                studentID: this.state.studentID
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status == "User Exists")
                {
                    alert("Student Account Already Created.");   
                }
                else if(result.status == "Invalid")
                {
                    alert("Registering Student Unsuccessful.");   
                }
                else
                {
                    // Bring to accountcreation page
                    this.props.history.push('/home')
                    alert("Student Created");
                }
            })
    }

    onFinish = (values) => {
        console.log('Success:', values);
        this.props.history.push('/home');
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
      
   /* handleDropdownChange(e) {
        this.setState({ year: e.target.value });
    }
*/
    handleGenderDropdownChange = (e) =>{
        this.setState({gender: e});
    }

    handleYearDropdownChange = (e) =>{
        this.setState({year: e});
    }

    render() {          
        return (
            <div>
                <h1>Create New User</h1>
            <div>
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
                        <Input type="text" onChange={this.email} />
                    </Form.Item>
            <Form>
                <Form.Item
                    name="firstname"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input type="text" onChange={this.firstname} />
                </Form.Item>

                <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input type="text" onChange={this.lastname} />
                </Form.Item>

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
                     <Input type="text" onChange={this.email} />
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
                        <Input.Password type="text" onChange={this.password} />
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
                        <Input.Password type="text" onChange={this.confirmpassword} />
                    </Form.Item>

                    <Form.Item
                        name="nickname"
                        label = "Nickname"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}  
                    >
                        <Input type="text" onChange={this.username} />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true, message: 'Please select gender!' }]}
                    >
                        <Select placeholder="select your gender" /*value={this.state.gender}*/ onChange={this.handleGenderDropdownChange}>
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
                        <Select placeholder="select the users year" /*value={this.state.year}*/ onChange={this.handleYearDropdownChange}>
                            <Option value="Freshman">Freshman</Option>
                            <Option value="Sophomore">Sophomore</Option>
                            <Option value="Junior">Junior</Option>
                            <Option value="Senior">Senior</Option>
                            <Option value="Masters+">Masters+</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="Student_ID"
                        label="Student ID"
                        rules={[{ required: false,pattern: new RegExp(/^[1-9]\d*$/, "g"),  message: 'Student ID has to be all numbers', whitespace: true },{ required:true,  message: 'Please enter a Student ID', whitespace: true}]}
                    >
                        <Input type="text" onChange={this.studentID} />
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
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button  onClick={this.AddStudent} type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </div>




            );
    }

}
