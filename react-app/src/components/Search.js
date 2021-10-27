import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Search.css';

export default class Search extends Component {

    constructor() {
        super();

        this.state = {
            SearchString: ''
        }

        this.SearchString= this.SearchString.bind(this);
      
    }

    SearchString(event) 
    {
        this.setState({ SearchString: event.target.value })
    }
    SendAdminSearch(event)
    {
        fetch('http://localhost:16648/api/DStudent/api/DStudent/SearchStudent', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                SearchString: this.state.SearchString
            })
        }).then((Response) => Response.json())
        .then((result) => {
            if (result.status === "Invalid"){
                // this.props.history.push('/LogIn')
            }
            
                
        })

    }
    render() {

        return (

            <div className="container-search">
                <div >
                    <h1 id='heading'> Search A Student </h1>
                    <div>
                        <form>
                            <div >

                                <div id = "wrapper">
                                    <div >
                                     <input id = "searchBar" OnChange ={this.SearchString} Placeholder="Please input a Students name or ID" />
                                     </div>
                                   
                                    <div >
                                        <button id = "primary-button" OnClick={this.SendAdminSearch} ClassName="primary-button" htmlType="submit" >Search </button>
                                    </div>
                                </div>

                            </div>


                        </form>

                    </div>



                </div>

                <div className="resultsBox">
                    <div className ="result-node"> 
                   
                    {/* <Link className = "student-name" to="/home/StudentProfile">Jason</Link> */}
                   
                    <a className='student-name' onClick ={()=>{ this.props.history.push('/home/StudentProfile')}}>Jason</a>
                    </div>

                </div>
            </div>
        );
    }













};