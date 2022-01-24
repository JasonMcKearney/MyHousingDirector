import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Button, Form, Modal, Input, Card } from 'antd';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './Student.css';
import Cookies from 'js-cookie';
import DormSelection from './DormSelection'
import StudentHome from './StudentHome'
import RoommateSelection from './RoommateSelection'
import StudentInfo from './StudentInfo'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

//TODO import "./StudentHome.css"
import defaultlogo from '../img/default_logo.png'
const { Meta } = Card;

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


export default class RoommateList extends Component {
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

              Cookies.set("ID", ID);
              Cookies.set("FN", firstName);
              Cookies.set("LN", lastName);
              Cookies.set("EM", email);
            })
            
    }

    state = {
        showModal: false
    }

  render() {
    return (
      <div className="StudentHomeBox-right">
                    <Card className="Roommate1"
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                        <p>{Cookies.get("FN")} {Cookies.get("LN")}</p>
                        <p>{Cookies.get("ID")} {Cookies.get("EM")}</p>

                    </Card>,<Card className="Roommate2"
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                        <p>{Cookies.get("FN")} {Cookies.get("LN")}</p>
                        <p>{Cookies.get("ID")} {Cookies.get("EM")}</p>

                    </Card>,<Card className="Roommate3"
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                        <p>{Cookies.get("FN")} {Cookies.get("LN")}</p>
                        <p>{Cookies.get("ID")} {Cookies.get("EM")}</p>
                    </Card>,
                </div>
    );
  }
}
