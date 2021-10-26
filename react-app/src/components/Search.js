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

export default class Search extends Component {

    render() {

        return (
            <div className="container-search">
                <div >
                    <h1>Search</h1>

                    <div>

                        <Form>

                            <div >
                          
                                <div ClassName = "search-bar">
                                <Input placeholder="Please input a Students name or ID" />
                                <Button ClassName="search-button"  htmlType="submit" >
                                        Search
                                    </Button>
                                </div>
                            
                            </div>

                            
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