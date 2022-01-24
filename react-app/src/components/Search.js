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
            studentName:'',
            studentlist: [],
        }

/*        //Student Object to store all the student data
        this.studentObj = {
            firstname: '',
            lastName:'',
            username:'',
            email:'',
            idNumber: '',
        };
*/

        // Gives access to functions below... 
        this.getResults = this.getResults.bind(this);
        this.searchText = this.searchText.bind(this);
        this.addItem = this.addItem.bind(this);
        this.listItems = this.listItems.bind(this);      
        //  this.studentObj = this.studentObj.bind(this);
    }

    searchText(event) {
        this.setState({ searchText: event.target.value });
        this.setState({ studentlist: [] })
    }

    // Is called after studentName is set, adds the student to the list
    addItem() {
        let studentlist = this.state.studentlist;
        studentlist.push(this.state.studentName);
        this.setState({
            studentlist
        });
      }

      // Returns list of students in a list format and updates cookies for later use throughout the application
      listItems() {
        let studentlist = this.state.studentlist;
        return (
          
            <Table>
                    <thead>
                        <tr>
                            <th>Username</th>
                        </tr>
                    </thead>
            <tbody>
            {
              studentlist.map((val, index) => {
                return (
                 
                 <tr>
                      <td className='result-node'> <a onClick={() => { this.props.history.push('/home/StudentProfile'); Cookies.set("student", val); } } className='student-name'>{val}</a></td>
                 </tr>
                );
              })
            }
            </tbody>
                            
        </Table>
        
        );
      }

    // Find results if there are any in the database
    getResults(){
        let currentComponent = this;
        let studentListLength = this.state.studentlist;

        console.log("Length: " + studentListLength.length)

        // Does not allow for multiple strings to be displayed if the input has not changed by the user
        if(studentListLength == 0)
        {
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
                    console.log("Next User: " + res[i].username)
                    if(res[i].username != "")
                    {
                        currentComponent.setState({studentName: res[i].username})
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
    
    render() {
        return (
            <div className="container-search">

            <div >
                <h1>Search</h1>
                <div>
                    <form>
                        <input type="text" onChange ={this.searchText} id = "searchBar" Placeholder="Please input a Students name or ID" />

                    </form>
                    <button onClick={this.getResults} id = "primary-button" htmlType="submit">Search </button>    

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