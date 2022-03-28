import React, { Component } from "react";
import "./AdminDormRequests.css";

// Export means any module (AdminDashboard.js file in this case) can use this script by importing it
export class AdminDormRequests extends Component {
    componentDidMount()
    {
        console.log("You have reached the page!!");
    }
    render(){
        return(
            <div class="container">
                <h1>Dorm Requests Page</h1>
                <div class="totalStudents-box">
                    <label style={{paddingTop:'4%'}}>Total Students on Campus</label>
                    <div style={{padding:'10%', paddingTop:'14%'}}></div>
                </div>
            </div>
        );
    }
}
