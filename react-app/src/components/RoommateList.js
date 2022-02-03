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

    this.state = {
        studentID: 0,
        studentName:'',
        studentlist: [],
        studentObj: {username:'', studentID:'', firstname:'', lastname:''}
    }
}
    getResults(){
        let currentComponent = this;
        let studentListLength = this.state.studentlist;

        console.log("Length: " + studentListLength.length)

        // Does not allow for multiple strings to be displayed if the input has not changed by the user
        if(studentListLength == 0)
        {
            // Passing parameter to Web API through address
            fetch('http://localhost:16648/api/Student/GetPendingOutboundRequests/'+ Cookies.get("UD"), {
                mode: 'cors', // this cannot be 'no-cors'
                headers: {                
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
            }).then(res=>res.clone().json())
            .then(function(res) {
                var loopData = ''
                var i;
                for (i = 0; i < res.length; i++)
                {
                   console.log("Next User: " + res[i].username)
                    console.log("Next studentID: " + res[i].studentID)
                    if(res[i].username != "")
                    {
                        currentComponent.setState({studentName: res[i].username})
                        currentComponent.setState({studentID: res[i].studentID})
                        currentComponent.setState({firstname: res[i].firstName})
                        currentComponent.setState({lastname: res[i].lastName})
                        
                        // Add student to list
                        currentComponent.addItem();
                    }
                    // Entries with characters entered do not match any usernames in the database
                    else
                        alert("No entries match the character/characters entered.")
                }
                currentComponent.setState({searchResults: loopData})
            })
        }
    }

    addItem() {

        const newstudentObj = { username: this.state.studentName, studentID: this.state.studentID, firstname: this.state.firstname, lastname: this.state.lastname }
      
        //this.setState({studentObj: newstudentObj} )

        console.log("New-Object " + newstudentObj.username)
       
        let newStudentlist = this.state.studentlist;

       for (var i = 0; i < newStudentlist.length; i++)
       {
          console.log('New Student List');
           console.log('-----------------------------');
           console.log(newStudentlist[i].username);
           console.log('-----------------------------\n');
       }
        console.log( newStudentlist.push(newstudentObj))
       
        for (var i = 0; i < this.state.studentlist.length; i++)
        {
            console.log('The State List');
            console.log('-----------------------------');
            console.log(this.state.studentlist[i].username);
            console.log('-----------------------------');
        }

           
         this.setState({
             studentlist: newStudentlist
          });
          

      }

    state = {
        showModal: false
    }
    
    listItems() {
        let studentlist = this.state.studentlist;
       
        return (
            <div>
            {
              studentlist.map((val, index) => {
                return (
                
                    <Card className="Roommate1"
                    hoverable
                    cover={<img alt="example" src={defaultlogo} />}
                >   
                    <p>{val.firstname} {val.lastname}</p>
                    <p>{val.username}</p>
                    <p>{val.studentID}</p>
                    <p><Button danger onClick={() => {
                          }} type="primary" htmlType="Delete">
                              Delete
                          </Button></p>
                </Card>
                );
              })
            }   
            </div>    
        );
        
    }

    componentDidMount(){
        this.getResults();
    }

  render() {
    return (
      <div className="StudentHomeBox-right">
          <div className="resultsBox">
                            { this.listItems() }
                        </div>
                </div>
    );
  }
}
