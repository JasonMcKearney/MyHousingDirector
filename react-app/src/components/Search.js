import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Search.css';
import Cookies from 'js-cookie';
import axios from 'axios'

export default class search extends Component {
    constructor() {
        super();

        this.state = {
            sUsernameToSearch : '',
            //usernamesFoundArray: []
            StudentData: []
        }
       this.sUsernameToSearch = this.sUsernameToSearch.bind(this);
    }

    sUsernameToSearch(event) {
        this.setState({ sUsernameToSearch: event.target.value })
    }

 /*   usernamesFoundArray(event) {
        this.setState({usernamesFoundArray: event.target.value})
    }
*/
   // const [data, setData] = useState([]);
   
   
   LookForStudents(event) {
        fetch('http://localhost:16648/api/Admin/FindStudents', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
            body: JSON.stringify({
                sUsernameToSearch: this.state.sUsernameToSearch
            })
        }).then((Response) => Response.json())
        .then((result) => {
            Cookies.set('test', "test")
            this.setState({
                StudentData: result.data.username
            })
            
            
        })
    }


    /*LookForStudents() {
        axios('http://localhost:16648/api/Admin/FindStudents'), {
              params:{
                  sUsernameToSearch: this.state.sUsernameToSearch.toString()
              }
            }
            .then(function (response) {
                this.setState({
                    StudentData: response.data
                })
            })
        }
*/






        /*  headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
          body: JSON.stringify({
                sUsernameToSearch: this.state.sUsernameToSearch.toString()
            })
         // }).then((Response) => Response.json())
          //.then((result) => {
              .then(result => {
                this.setState({
                    StudentData: result.data
                });
            })
    }
*/          
/*        
        // Admin find students that match ...
        axios.get('http://localhost:16648/api/Admin/FindStudents', {
          /*  headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            
            method: 'GET',
            body: JSON.stringify({
                sUsernameToSearch: this.state.sUsernameToSearch
            })
        }).then((data) => data.json())
            .then(data => {
             // create an array of contacts only with relevant data
            const newContacts = response.data.map(c => {
            return {
              name: c.name
              
            };
          });
  
          // create a new "State" object without mutating 
          // the original State object. 
          const newState = Object.assign({}, this.state, {
            contacts: newContacts
          });

           // store the new state object in the component's state
            this.setState(newState);
        })
        .catch(error => console.log(error));
*/
    render() {
        console.log(this.state.usernamesFoundArray);
        return (
            <div className="container-search">
                <div >
                    <h1>Search</h1>
                    <div>
                        <form>
                            <div >

                                <div id = "wrapper">
                                    <div >
                                     <input id = "searchBar" Placeholder="Please input a Students name or ID" onChange={this.sUsernameToSearch} />
                                     </div>
                                   
                                    <div >
                                        <button onClick={this.LookForStudents} id = "primary-button" ClassName="primary-button" htmlType="submit">Search </button>
                                    </div>
                                </div>

                            </div>


                        </form>

                    </div>



                </div>

                <section>  
                <h1>Products List</h1>  
                <div>  
                    <div>   
                        <h1>  
                            {  
                                this.state.StudentData.map((p, index) => {  
                                  return <tr key={index}><td>{p.username}</td></tr>;  
                                })   
                            }  
                        </h1>  
                    </div>  
                </div>  
  
  
            </section> 



                
            </div>
        );
    } 
}