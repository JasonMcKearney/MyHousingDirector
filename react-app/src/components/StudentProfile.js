import React, { Component } from 'react';
import default_logo from '../img/default_logo.png'
import './StudentProfile.css'
export class StudentProfile extends Component {



    render() {

        return (
            <div>
                 <div className = "student-image-container">
                    <img className="student-image" src={default_logo}></img>
                </div> 
                <form>

                    <div>
                    <label className = "student-info-label">Name:</label>
                    <input className= "student-infor-input" type = "text" defaultValue="Jason McKearney"  ></input>
                    </div> 
                    
                    <div className = "student-container">
                    <label className = "student-info-label">Email:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = "Jason.McKearney@snhu.edu" autoComplete = "off"></input>
                    </div>   
                    
                    <div className = "student-container">
                    <label className = "student-info-label">Year:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = "Junior" autoComplete = "off"></input>
                    </div>
                    
                    <div className = "student-container">
                    <label className = "student-info-label" >Password:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = "Welcome123!" autoComplete = "off"></input>
                    </div>
                    
                    <div className = "student-container">
                    <label className = "student-info-label">Username:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = "J.mckearney" autoComplete = "off"></input>
                    </div>

                </form>
                <button type="submit">submit</button>
            </div>

        );

    }




}
