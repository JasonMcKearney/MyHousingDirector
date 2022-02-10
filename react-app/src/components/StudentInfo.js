import React, { Component } from "react";
import "./StudentInfo.css";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Modal,
  TimePicker,
} from "antd";
import Cookies from "js-cookie";
import defaultlogo from "../img/default_logo.png";

const { Option } = Select;
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

const onChange = (time, timeString) => {
  console.log(time, timeString);
};

export default class studentinfo extends Component {
  constructor() {
    super();

    // fetch('http://localhost:16648/api/Student/', {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //         username: Cookies.get("username")
    //     })
    // }).then((Response) => Response.json())
    //     .then((result) => {
    //         var ID = result.studentID;
    //         var firstName = result.firstName;
    //         var lastName = result.lastName;
    //         var year = result.year;

    //         Cookies.set("ID", ID);
    //         Cookies.set("FN", firstName);
    //         Cookies.set("LN", lastName);
    //         Cookies.set("YR", year);
    //     })

    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      gender: "",
      year: "",
      studentID: "",
    };

    this.username = this.username.bind(this);
    this.firstname = this.firstname.bind(this);
    this.lastname = this.lastname.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.confirmpassword = this.confirmpassword.bind(this);
    this.gender = this.gender.bind(this);
    this.year = this.year.bind(this);
    this.studentID = this.studentID.bind(this);
  }

  username(event) {
    this.setState({ username: event.target.value });
  }
  firstname(event) {
    this.setState({ firstname: event.target.value });
  }
  lastname(event) {
    this.setState({ lastname: event.target.value });
  }
  email(event) {
    this.setState({ email: event.target.value });
  }
  password(event) {
    this.setState({ password: event.target.value });
  }
  confirmpassword(event) {
    this.setState({ confirmpassword: event.target.value });
  }
  gender(event) {
    this.setState({ gender: event.target.value });
  }
  year(event) {
    this.setState({ year: event.target.value });
  }
  studentID(event) {
    this.setState({ studentID: event.target.value });
  }

  onFinish = (values) => {
    console.log("Success:", values);
    this.props.history.push("/student/home");
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div className="Student-page-background">
        <div>
          <div classname="UserInfo-img">
            <img
              src={defaultlogo}
              className="defaultlogo"
              style={{ width: "15%" }}
            />
          </div>
          Welcome !{Cookies.get("FN")}
          {Cookies.get("LN")}
          <Form.Item
            name="Sleepstarttime"
            label="When you start sleeping?"
            rules={[
              {
                required: true,
                message: "Please Select a time!",
              },
            ]}
            hasFeedback
          >
            <TimePicker use12Hours format="h:mm a" onChange={onChange} />
          </Form.Item>
          <Form.Item
            name="Wakeuptime"
            label="When you wake up?"
            rules={[
              {
                required: true,
                message: "Please Select a time!",
              },
            ]}
            hasFeedback
          >
            <TimePicker use12Hours format="h:mm a" onChange={onChange} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button onClick type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </div>
    );
  }
}
