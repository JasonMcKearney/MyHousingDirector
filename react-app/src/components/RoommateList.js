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
import defaultlogo from '../img/default_logo.png'
import Grid from 'antd/lib/card/Grid';
const { Meta } = Card;

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


export default class RoommateList extends Component {
  constructor(props){
    super(props);

    this.state = {
        studentID: 0,
        studentName:'',
        studentListInbound: [],
        studentListOutbound: [],
        studentObj: {reqid:'', firstname:'', lastname:'', email:'', state:''}
    }
}
    getOutboundResults(){
        let currentComponent = this;
        let studentListLength = this.state.studentListOutbound;

        console.log("Length: " + studentListLength.length)

        if(studentListLength == 0)
        {
            // Passing parameter to Web API through address
            fetch('http://localhost:16648/api/Student/GetOutboundRequests/'+ Cookies.get("UD"), {
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
                for (i = 0; i < res.length; i++) //Iterate through each result returned by the REST API. Skips a matched ID (no self in the roommates list)
                {
                    if(res[i].studentID == Cookies.get("ID")){ 
                        continue;
                    }
                   console.log("Next User: " + res[i].username)
                    console.log("Next studentID: " + res[i].studentID)
                    if(res[i].username != "")
                    {
                        currentComponent.setState({reqid: res[i].requestID})
                        currentComponent.setState({firstname: res[i].studentFirstName})
                        currentComponent.setState({lastname: res[i].studentLastName})
                        currentComponent.setState({email: res[i].studentEmail})
                        currentComponent.setState({state: res[i].requestState})
                        // Add student to list
                        currentComponent.addItemOutbound();
                    }
                    // Entries with characters entered do not match any usernames in the database
                    else
                        alert("No entries match the character/characters entered.")
                }
                currentComponent.setState({searchResults: loopData})
                console.log("testing commit stages");
            })
        }
    }

    getInboundResults(){
        let currentComponent = this;
        let studentListLength = this.state.studentListInbound;

        console.log("Length: " + studentListLength.length)

        if(studentListLength == 0)
        {
            // Passing parameter to Web API through address
            fetch('http://localhost:16648/api/Student/GetInboundRequests/'+ Cookies.get("UD"), {
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
                for (i = 0; i < res.length; i++) //Iterate through each result returned by the REST API. Skips a matched ID (no self in the roommates list)
                {
                    if(res[i].studentID == Cookies.get("ID")){ 
                        continue;
                    }
                   console.log("Next User: " + res[i].username)
                    console.log("Next studentID: " + res[i].studentID)
                    if(res[i].username != "")
                    {
                        currentComponent.setState({reqid: res[i].requestID})
                        currentComponent.setState({firstname: res[i].studentFirstName})
                        currentComponent.setState({lastname: res[i].studentLastName})
                        currentComponent.setState({email: res[i].studentEmail})
                        currentComponent.setState({state: res[i].requestState})
                        // Add student to list
                        currentComponent.addItemInbound();
                    }
                    // Entries with characters entered do not match any usernames in the database
                    else
                        alert("No entries match the character/characters entered.")
                }
                currentComponent.setState({searchResults: loopData})
                console.log("testing commit stages");
            })
        }
    }
    
    addItemInbound() {

        const newstudentObj = { state: this.state.state, email: this.state.email, firstname: this.state.firstname, lastname: this.state.lastname, reqid: this.state.reqid }
      
        console.log("New-Object " + newstudentObj.reqid)
       
        let newStudentlist = this.state.studentListInbound;

       for (var i = 0; i < newStudentlist.length; i++)
       {
          console.log('New Student List');
           console.log('-----------------------------');
           console.log(newStudentlist[i].reqid);
           console.log('-----------------------------\n');
       }
        console.log( newStudentlist.push(newstudentObj))
       
        for (var i = 0; i < this.state.studentListInbound.length; i++)
        {
            console.log('The State List');
            console.log('-----------------------------');
            console.log(this.state.studentListInbound[i].reqid);
            console.log('-----------------------------');
        }

           
         this.setState({
            studentListInbound: newStudentlist
          });
          

      }

    state = {
        showModal: false
    }
    
    addItemOutbound() {

        const newstudentObj = { state: this.state.state, email: this.state.email, firstname: this.state.firstname, lastname: this.state.lastname, reqid: this.state.reqid}
      
        console.log("New-Object " + newstudentObj.reqid)
       
        let newStudentlist = this.state.studentListOutbound;

       for (var i = 0; i < newStudentlist.length; i++)
       {
          console.log('New Student List');
           console.log('-----------------------------');
           console.log(newStudentlist[i].reqid);
           console.log('-----------------------------\n');
       }
        console.log( newStudentlist.push(newstudentObj))
       
        for (var i = 0; i < this.state.studentListOutbound.length; i++)
        {
            console.log('The State List');
            console.log('-----------------------------');
            console.log(this.state.studentListOutbound[i].reqid);
            console.log('-----------------------------');
        }

           
         this.setState({
            studentListOutbound: newStudentlist
          });
          

      }

    state = {
        showModal: false
    }
    

    listOutboundItems() {
        let studentlist = this.state.studentListOutbound;
       
        return (

            <div className="card-grid">
                {
                    
                studentlist.map((val, index) => {
                    return (

                        <div className="roommate-card"
                        
                    >   
                        <p>{val.firstname} {val.lastname}</p>
                        <p>{val.email}</p>
                        <p>{val.state}</p>
                       <p><Button danger onClick={() => {

                        this.DeletePending(val.studentID);

                          }} type="primary" htmlType="Delete">
                              Delete
                          </Button></p>
                    </div>
                    );
                })
                }  
                    </div> 
        );
        
    }

    listInboundItems() {
        let studentlist = this.state.studentListInbound;
        return (

            <div className="card-grid">
                {
                    
                studentlist.map((val, index) => {
                    return (

                        <div className="roommate-card"
                        
                    >   
                        <p>{val.firstname} {val.lastname}</p>
                        <p>{val.email}</p>
                        <p>{val.state}</p>
                       <p><Button danger onClick={() => {

                        this.DeletePending(val.studentID);

                          }} type="primary" htmlType="Delete">
                              Delete
                          </Button></p>
                          <p><Button danger onClick={() => {

                        this.DeletePending(val.studentID);

                            }} type="primary" htmlType="Delete">
                                Delete
                            </Button></p>
                    </div>
                    );
                })
                }  
                    </div> 
        );
        
    }

    DeletePending(user_id){
        console.log(user_id)
        console.log("funciton reached")
        fetch('http://localhost:16648/api/Student/DeleteRoommate', {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({

                uid: Cookies.get("UD"),
                reciever_id: user_id
            })
        }).then((Response) => Response.json())
        .then((result) => {
            console.log("response: " + result.status)
            alert(result.message);

        })
    }

    componentDidMount(){
        this.getOutboundResults();
        this.getInboundResults();
    }

  render() {
    return (
        <div className="Student-page-background">
             <div className="StudentHomeBox">
                 <div className="roommate-box">
                        <p>Outbound requests</p>
                            { this.listOutboundItems() }

                </div>
                <div className="roommate-box">
                        <p>Inbound requests</p>
                            { this.listInboundItems() }

                </div>
            </div>
        </div>
    );
  }
}
