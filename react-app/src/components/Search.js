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
                    <h1>Search</h1>
                    <div>
                        <Form>
                            <Form.Item>
                                <Input type="text" onChange={this.searchText} id = "searchBar" Placeholder="Please input a Students name or ID" />
                            </Form.Item>
                            <button onClick={this.getResults} id = "primary-button" htmlType="submit">Search </button>    
                        </Form>
                    </div>
                </div>

                <section>  
                    <div>     
                        <div className="resultsBox"> 
                            <ul>
                                <Link className= "student-name" to={'/StudentProfile'}
                                    dangerouslySetInnerHTML={{__html: searchResults}}>    
                                </Link>   
                            </ul>    
                        </div>  
                    </div>  
                </section> 
            </div>
        );
    } 
}