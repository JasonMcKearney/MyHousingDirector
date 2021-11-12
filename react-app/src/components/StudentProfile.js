import Cookies from 'js-cookie';
import React, { Component } from 'react';
import default_logo from '../img/default_logo.png'
import './StudentProfile.css'
export class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName:'',
            lastName:'',
            username:'',
            email:'',
            year:'',
            password:'',
        }
    }

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
            currentComponent.setState({firstName: res[0].firstName})
            currentComponent.setState({lastName: res[0].lastName})
            currentComponent.setState({username: res[0].username})
            currentComponent.setState({email: res[0].email})
            currentComponent.setState({year: res[0].year})
            currentComponent.setState({password: res[0].password})
        })
    }

    componentDidMount()
    {
        this.fetchData();
    }
     
    // Go to below function after clicking submit button
    updateStudentFields()
    {
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
                if(res[i].username != "")
                {
                    currentComponent.setState({studentName: res[i].username})
                    // Add student to list
                    currentComponent.addItem();
                }
                // Entries with characters entered do not match any usernames in the database
                else
                    alert("No entries match the character/characters entered.")
            }
            currentComponent.setState({searchResults: loopData})
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
                <form>

                    <div>
                    <label className = "student-info-label">Firstname:</label>

                    <input className= "student-infor-input" type = "text" defaultValue= {firstName}></input>

                    </div> 

                    <div>
                    <label className = "student-info-label">Lastname:</label>
                    <input className= "student-infor-input" type = "text" defaultValue={lastName}  ></input>
                    </div> 
                    
                    <div className = "student-container">
                    <label className = "student-info-label">Email:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = {username} autoComplete = "off"></input>
                    </div>   
                    
                    <div className = "student-container">
                    <label className = "student-info-label">Year:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = {email} autoComplete = "off"></input>
                    </div>
                    
                    <div className = "student-container">
                    <label className = "student-info-label" >Password:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = {year} autoComplete = "off"></input>
                    </div>
                    
                    <div className = "student-container">
                    <label className = "student-info-label">Username:</label>
                    <input className= "student-infor-input" type = "text" defaultValue = {password} autoComplete = "off"></input>
                    </div>


                    <button onClick={this.updateStudentFields} id = "primary-button" htmlType="submit">Submit</button>    

                    <button type="submit">Email Student Account Details</button>
                </form>
            </div>

        );
    }
}
