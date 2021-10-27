import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                                    <div >
                                     <input id = "searchBar" Placeholder="Please input a Students name or ID" />
                                     </div>
                                   
                                    <div >
                                        <button id = "primary-button" ClassName="primary-button" htmlType="submit" >Search </button>
                                    </div>
                                </div>

                            </div>


                        </form>

                    </div>



                </div>

                <div className="resultsBox">
                    <div className ="result-node"> 
                    <Link className= "student-name" to={'/StudentProfile'}>Jason McKearneyy</Link>
                    </div>

                </div>
            </div>
        );
    }













};