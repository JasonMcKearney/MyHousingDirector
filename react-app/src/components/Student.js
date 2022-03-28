import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Button, Form, Modal, Input } from "antd";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Student.css";
import Cookies from "js-cookie";
import bg001 from "../img/bg001.jpeg";
import DormSelection from "./DormSelection";
import StudentHome from "./StudentHome";
import RoommateSelection from "./RoommateSelection";
import StudentInfo from "./StudentInfo";
import RoommateList from "./RoommateList";

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Student extends Component {
  constructor(props){
    super(props);
     fetch('http://localhost:16648/api/Student/', {
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
               var email = result.email
               var user_id = result.user_id;

               Cookies.set("ID", ID);
               Cookies.set("FN", firstName);
               Cookies.set("LN", lastName);
               Cookies.set("EM", email);
               Cookies.set("UD", user_id);
             })
  }
  state = {
    showModal: false,
    // 默认图；当请求接口后需要改变此图
    bgPicSrc: bg001,
  };
  render() {
    let { showModal, bgPicSrc } = this.state;
    return (
      <div
        style={{ backgroundImage: `url(${bgPicSrc})` }}
        className="Student-page-wrap"
        >
            <div className = "StudentPageNavbar">
            <Menu
                className="Student-nav-bar"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
            >
                <Menu.Item key="1">
                    <Link to="/student/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/student/DormSelect">Dorm Selection</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/student/RoommateSelect">Roommate Selection</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/student/RoommateList">Roommate List</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/student/StudentInfo">Profile</Link>
                </Menu.Item>
              </Menu>
            </div>
        <Modal
          title="Change Your password"
          visible={showModal}
          onOk={() => {}}
          onCancel={() => {
            this.setState({
              showModal: false,
            });
          }}
        >
          <div>
            <Form.Item
              name="Old password"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
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
                  message: "Please input your new password!",
                },
              ]}
              hasFeedback
            >
              <Input type="text" onChange={this.password} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("New password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input type="text" onChange={this.confirmpassword} />
            </Form.Item>
          </div>
        </Modal>
        <Button
          onClick={() => {
            Cookies.remove("ID");
            Cookies.remove("FN");
            Cookies.remove("LN");
            Cookies.remove("EM");
            Cookies.remove("username");
            Cookies.remove("student");
            Cookies.remove("buildingID");
            Cookies.remove('UD');
            Cookies.remove('numRoommates');

            this.props.history.push("/LogIn");
          }}
          type="primary"
          htmlType="Logout"
          className="Student-logoutBtn"
        >
          Logout
        </Button>
          <Switch>
            <Route path="/student/Home" component={StudentHome} />
            <Route path="/student/RoommateSelect"component={RoommateSelection}/>
            <Route path="/student/DormSelect" component={DormSelection} />
            <Route path="/student/StudentInfo" component={StudentInfo} />
            <Route path="/student/RoommateList" component={RoommateList} />
          </Switch>
            </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userinfo: state.userinfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUserinfo(payload) {
      dispatch({
        type: "UPDATE_USERINFO",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Student);
