import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Search.css';

import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
} from 'antd';
import e from 'cors';

export default class Search extends Component {
    constructor() {
        super();
 
        this.state = {
            searchBar: ''
        };

        this.searchBar = this.searchBar.bind(this);
    }
    searchBar(e) {
        this.setState({ searchBar: e.target.value })
    }
    submit(event) {
        fetch('http://localhost:16648/api/DStudent/{id}', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                searchBar: this.searchBar.state
            })
        }).then((Response) => Response.json())
            .then((result) => {
                this.props.history.push('/search')
            })
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    render() {

        return (
            <div className="container-search">
                <div>
                    <h1>Search</h1>

                    <div>

                        <Form>

                            <Form.Item
                                id="searchBar"
                                name="searchBar"
                                label="Search"
                            >
                                <Input type="text" onChange={this.searchBar} placeholder="Please input a Students name or ID" />

                            </Form.Item>
                            <Form.Item>
                            <Button onClick={this.submit} 
                                type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                        </Form>

                    </div>



                </div>

                <div className="resultsBox">
                Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                 magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    
                </div>
            </div>
        );
    }













};