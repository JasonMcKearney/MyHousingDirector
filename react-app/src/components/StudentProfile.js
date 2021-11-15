import Cookies from 'js-cookie';
import React, { Component } from 'react';
import default_logo from '../img/default_logo.png'
import './StudentProfile.css'
export class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentID: '',
            firstName:'',
            lastName:'',
            username:'',
            email:'',
            year:'',
            password:'',
        }
/*        this.firstName = this.firstName.bind(this);
        this.lastName = this.lastName.bind(this);
        this.username = this.username.bind(this);
        this.email = this.email.bind(this);
        this.year = this.year.bind(this);
        this.password = this.password.bind(this);
*/
        // Allows me to do this.state.--, and access different state values in updateStudentFields() function
        this.updateStudentFields = this.updateStudentFields.bind(this);
    }

    firstName = (event) => {
        this.setState({ firstName: event.target.value })
        console.log("Firstname: " + this.state.firstName);
    }
    lastName = (event) =>{
        this.setState({ lastName: event.target.value })
    }
    username = (event) => {
        this.setState({ username: event.target.value })
    }
    email = (event) => {
        this.setState({ email: event.target.value })
    }
    year = (event) => {
        this.setState({ year: event.target.value })
    }

    password = (event) => {
        this.setState({ password: event.target.value })
    }

    // Get data from student table based upon searched student username
    fetchData(){
        let currentComponent = this;
        fetch('http://localhost:16648/api/Admin/FindStudentInfo/'+Cookies.get("student"), {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {                
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
        }).then(res=>res.clone().json())
        .then(function(res) 
        {
            currentComponent.setState({studentID: res[0].user_id})
            currentComponent.setState({firstName: res[0].firstName})
            currentComponent.setState({firstName: res[0].firstName})
            currentComponent.setState({lastName: res[0].lastName})
            currentComponent.setState({username: res[0].username})
            currentComponent.setState({email: res[0].email})
            currentComponent.setState({year: res[0].year})
            currentComponent.setState({password: res[0].password})
        })
    }

    // Upon load of page, call fetchData()
    componentDidMount()
    {
        this.fetchData();
    }

    // Go to below function after users clicks on the submit button
    updateStudentFields()
    {
        // Admin add student account...
        fetch('http://localhost:16648/api/Admin/UpdateProfile', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                user_id: this.state.studentID,
                firstName: this.state.firstName,           
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                year: this.state.year,                
                password: this.state.password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                if (result.status == "User Exists")
                {
                    alert("Student with the same username already created.");   
                }
                else if(result.status == "Invalid")
                {
                    alert("Update Student info unsuccessful.");   
                }
                else
                {
                    alert("Updated Student Info.");
                }
            })
    }

    
    render() {
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let username = this.state.username;
        let email = this.state.email;
        let year = this.state.year;
        let password = this.state.password;

        return (
            <div>
                 <div className = "student-image-container">
                    <img className="student-image" src={default_logo}></img>
                </div> 
                <div>
                    <div>
                        <label className = "student-info-label">Firstname:</label>

                        <input className= "student-infor-input" type = "text" defaultValue= {firstName} onChange={this.firstName}></input>

                    </div> 

                    <div>
                        <label className = "student-info-label">Lastname:</label>
                        <input className= "student-infor-input" type = "text" defaultValue={lastName} onChange={this.lastName} ></input>
                    </div> 
                    
                    <div className = "student-container">
                        <label className = "student-info-label">Username:</label>
                        <input className= "student-infor-input" type = "text" defaultValue = {username} onChange={this.username} autoComplete = "off"></input>
                    </div>

                    <div className = "student-container">
                        <label className = "student-info-label">Email:</label>
                        <input className= "student-infor-input" type = "text" defaultValue = {email} onChange={this.email}autoComplete = "off"></input>
                    </div>   
                    
                    <div className = "student-container">
                        <label className = "student-info-label">Year:</label>
                        <input className= "student-infor-input" type = "text" defaultValue = {year} onChange={this.year} autoComplete = "off"></input>
                    </div>
                    
                    <div className = "student-container">
                        <label className = "student-info-label" >Password:</label>
                        <input className= "student-infor-input" type = "text" defaultValue = {password} onChange={this.password} autoComplete = "off"></input>
                    </div>

                    </div>


                    <button onClick={this.updateStudentFields} id = "primary-button" htmlType="submit">Submit</button>    

                    <button type="submit">Email Student Account Details</button>
 
            </div>

        );
    }
}
