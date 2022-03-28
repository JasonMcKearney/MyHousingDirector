import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./AdminDormRequests.css";

// Export means any module (AdminDashboard.js file in this case) can use this script by importing it
export class AdminDormRequests extends Component {
    componentDidMount()
    {
        console.log("You have reached the page!!");
    }

    printResults() {
        return (
            <table>
                <thead>
                    <tr>
                        <td className ="table-head">First Name</td>
                        <td className ="table-head">Last Name</td>
                        <td className ="table-head">year</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.studentList.map((val, index) => {
                        return (
                            <tr>
                                <td className="result-word" key={index}>
                                    {" "}
                                    test
                                </td>
                                <td className="result-word" key={index}>
                                    {" "}
                                    test
                                </td>
                                <td className="result-word" key={index}>
                                    {" "}
                                    test
                                </td>
                                <td className="result-word">
                                    <button className="add-icon">
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                console.log("you have pressed a button")
                                            }}
                                            type="submit"
                                            icon={faUserPlus}
                                            size="2x"
                                            color="green"
                                        />{" "}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
    render(){
        return(
            <div class="container">
                <div className="container-results">{this.printResults()}</div>
                <label style={{fontSize:'180%', paddingBottom: '3%', paddingRight:'8%'}}>Dorm Requests Page</label>
                <div class="requests-box">
                    <div style={{padding:'10%', paddingTop:'14%'}}>test</div>
                </div>
            </div>    
        );
    }
}
