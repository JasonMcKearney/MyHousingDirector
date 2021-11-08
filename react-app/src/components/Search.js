import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Search.css';
//import Cookies from 'js-cookie';
import axios from 'axios'
import { tsParameterProperty } from '@babel/types';
import { useParams } from 'react-router';

export default class search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText : '',
            searchResults: ''
        }
        this.getResults = this.getResults.bind(this);
        this.searchText = this.searchText.bind(this);
    }


    searchText(event) {
        this.setState({ searchText: event.target.value })
    }
    getResults(){
        let currentComponent = this;
        var test = this.state.searchText;
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
                loopData += `<li>${res[i].username}</li>`
            }
            currentComponent.setState({searchResults: loopData})
        })
    }
    
    render() {
        const {searchResults} = this.state
        
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
}