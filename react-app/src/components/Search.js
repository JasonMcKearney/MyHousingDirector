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
            usernamesFoundArray: []
        }
       this.sUsernameToSearch = this.sUsernameToSearch.bind(this);
    }

    sUsernameToSearch(event) {
        this.setState({ sUsernameToSearch: event.target.value })
    }

    usernamesFoundArray(event) {
        this.setState({usernamesFoundArray: event.target.value})
    }

   // const [data, setData] = useState([]);
    LookForStudents(event) {
        // Admin find students that match ...
        fetch('http://localhost:16648/api/Admin/FindStudents', {
          /*  headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            */
            method: 'GET',
            body: JSON.stringify({
                sUsernameToSearch: this.state.sUsernameToSearch
            })
        }).then((data) => data.json())
            .then(data => {
               /* // Here you need to use an temporary array to store NeededInfo only 
                let tmpArray = [];
                for (var i = 0; i < data.results.length; i++) {
                    tmpArray.push(data.results[i].NeededInfo)
                }
                */

                this.setState({
                    //usernamesFoundArray : [...this.state.usernamesFoundArray, tmpArray]                    
                    usernamesFoundArray: data
                })
                //Cookies.set("usernamesfoundarray", tmpArray);
            })
    }

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
                                        <button id = "primary-button" ClassName="primary-button" htmlType="submit" onClick={this.LookForStudents}>Search </button>
                                    </div>
                                </div>

                            </div>


                        </form>

                    </div>



                </div>

                <div className="resultsBox">
                    <div>
                     <div className ="result-node"> 
	                    <Link className= "student-name" to={'/StudentProfile'}>{this.state.usernamesFoundArray}</Link>
                    </div>
                        <Link className= "student-name" to={'/StudentProfile'} id="username">
                            {this.state.usernamesFoundArray.map(item=>(
                            <option key={item.username}>{item.username}</option> 
                            ))
                            }
                        </Link>
                    </div>
                </div>
            </div>
        );
    } 
}