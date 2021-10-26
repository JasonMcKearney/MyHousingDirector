import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Search.css';


export default class Search extends Component {

    render() {

        return (
            <div className="container-search">
                <div >
                    <h1>Search</h1>
                    <div>
                        <form>
                            <div >

                                <div id = "wrapper">
                                    <div ClassName="search-bar">
                                     <input id = "searchBar" Placeholder="Please input a Students name or ID" />
                                     </div>
                                   
                                    <div ClassName = "search-button">
                                        <button htmlType="submit" >
                                            Search
                                        </button>
                                    </div>
                                </div>

                            </div>


                        </form>

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