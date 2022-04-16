import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Search.css';
//import Cookies from 'js-cookie';
import axios from 'axios'
import { tsParameterProperty } from '@babel/types';
import { useParams } from 'react-router';
import Cookies from 'js-cookie';



// Referenced https://www.cubui.com/blog/react/render-arrays-react-js/ for help using a list

export default class search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText : '',
            searchResults: '',
            user_id: 0,
            studentName:'',
            studentlist: [],
            studentObj: {username:'', user_id:''},
        }

     
        //Student Object to store all the student data
        
        
    
        // Gives access to functions below... 
        this.getResults = this.getResults.bind(this);
        this.searchText = this.searchText.bind(this);
        this.addItem = this.addItem.bind(this);
        this.listItems = this.listItems.bind(this);      
       
    }

    searchText(event) {
        console.log(event.target.value)
        this.setState({ searchText: event.target.value });
       // this.setState({ studentlist: [] })
    }

    // Is called after studentName is set, adds the student to the list
    addItem() {

        const newstudentObj = { username: this.state.studentName, user_id: this.state.user_id}
      
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

      // Returns list of students in a list format and updates cookies for later use throughout the application
      listItems() {
        let studentlist = this.state.studentlist;
       
        return (
          
            <table>
                    <thead>
                        <tr>
                            <th className="search-Head">ID</th>
                            <th className="search-Head">Username</th>
                            <th></th>
                        </tr>
                    </thead>
            <tbody>
            {
              studentlist.map((val, index) => {
                return (
                
                 <tr className='result-node' >
                      
                      <td className='student-info'> {val.user_id}</td>
                      <td className='student-info'> {val.username}</td>
                      <td className='result-button'><button onClick={() => { this.props.history.push('/home/StudentProfile'); Cookies.set("student", val.username); } } id ='primary-button' >View</button></td>
                 </tr>
                );
              })
            }
            </tbody>
                            
        </table>
        
        );
      }
      removeAllInfo(){
        
        this.setState({
            studentlist: [],
        });
        
        this.listItems();
    }

    // Find results if there are any in the database
    getResults(){
        let currentComponent = this;
        let studentListLength = this.state.studentlist;

        console.log("Length: " + studentListLength.length)

        currentComponent.removeAllInfo();
         
            // Passing parameter to Web API through address
            fetch('http://localhost:16648/api/Admin/FindStudents/'+this.state.searchText, {
                mode: 'cors', // this cannot be 'no-cors'
                headers: {                
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                method: 'POST',
            }).then(res=>res.clone().json())
            .then(function(res) {
               console.log("hello " + res[0].username)
                var loopData = ''
                var i;
                for (i = 0; i < res.length; i++)
                {
                   // console.log("Next User: " + res[i].username)
                    console.log("Next User_id: " + res[i].user_id)
                    if(res[i].username != "")
                    {
                        currentComponent.setState({studentName: res[i].username})
                        currentComponent.setState({user_id: res[i].user_id})
                        
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
    
    render() {
        return (
            <div className="container-search">

            <div >
                <h1>Search</h1>
                <div>
                    <form>
                        <input type="text" onChange ={this.searchText} id = "searchBar" Placeholder="Please input a Students name or ID" />

                    </form>
                    <button onClick={this.getResults} id = "primary-button" htmlType="submit" style={{right: "37.5%", marginTop: "2%"}}>Search</button>    

                </div>

            </div>
                <section>  
                    <div>    
                        <div className="resultsBox">
                            { this.listItems() }
                        </div>
                    </div>  
                </section>
        </div>
        );
    } 
}