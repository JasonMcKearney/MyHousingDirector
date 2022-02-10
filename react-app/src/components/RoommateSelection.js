import React, { Component } from 'react'
import "./RoommateSelection.css"
import Cookies from  'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default class RoommateSelection extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            userSearchString : '',
            results : '',
            resultsList : [],
            studentList : [],
            user_id: '',
            firstName: '',
            lastName: '',
            year:'',
            

        }

            this.setSearchText = this.setSearchText.bind(this);
            this.submitSearchText = this.submitSearchText.bind(this);
            this.printResults = this.printResults.bind(this);
            this.addItemResults = this.addItemResults.bind(this);
            this.setRoommateChoice = this.setRoommateChoice.bind(this);
            
    }


    
    setSearchText(event)
    {
         this.setState({ userSearchString: event.target.value });
         console.log(this.state.userSearchString)
    }
    addItemResults()
    {

        const newstudentObj = {user_id: this.state.user_id,firstName: this.state.firstName, lastName: this.state.lastName, year: this.state.year}
        let newStudentlist = this.state.studentList;
        newStudentlist.push(newstudentObj)

        this.setState({
            studentList: newStudentlist
        })

         console.log("item added to the list")
    }
    printResults(){

        
        console.log(this.state.studentList);
        return (

            <table>
                <thead>
                    <tr className='table-header'>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Year</td>
                        <td></td>
                    </tr>
                </thead>
           
            <tbody>
              {
                this.state.studentList.map((val, index) => {
                    return (
                   
                          <tr>  
                              
                              
                                  <td className="result-word" key={index}> {val.firstName}</td>
                                  <td className="result-word" key={index}> {val.lastName}</td>
                                  <td className="result-word" key={index}> {val.year}</td>
                                  <td className="result-icon"><button className='add-icon' ><FontAwesomeIcon className= "icon"onClick = {() => {this.AddStudent(val.user_id)}} type ="submit" icon={faUserPlus} size = "3x" color="green" /> </button></td> 
                                  
                              
                              
                           
                              
                          </tr>
                          
                  
                          
                  );
                })
              }
            </tbody>
            </table>
          );
        
    }

    submitSearchText()

    {

        let currentComponent = this;

        console.log(this.state.userSearchString)

        fetch('http://localhost:16648/api/Student/FindRoommateInfo/' + this.state.userSearchString, {

            mode: 'cors', // this cannot be 'no-cors'

            headers: {                

                'Content-Type': 'application/json',

                'Accept': 'application/json',

            },

            method: 'POST',

        }).then(res=>res.clone().json())

        .then(function(res) {

           

           const studentArray = currentComponent.state.studentList.slice();

           console.log("studentArray before filling: " + studentArray)

           var i;
            for( i = 0; i < res.length; i++)

             {

                 console.log("firstname: " + res[0].firstName)

                 console.log("lastname: " + res[0].lastName)

                 console.log("year: " + res[0].year)
                 currentComponent.setState({user_id: res[i].user_id})
                 currentComponent.setState({firstName: res[i].firstName})
                 currentComponent.setState({lastName: res[i].lastName})
                 currentComponent.setState({year: res[i].year})

                 currentComponent.addItemResults();
            }

        });

    }
    AddStudent(user_id){

       
        console.log(user_id)
        console.log("funciton reached")
        fetch('http://localhost:16648/api/Student/AddRoommate', {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({

                uid: Cookies.get("ID"),
                reciever_id: user_id
            })
        }).then((Response) => Response.json())
        .then((result) => {
            console.log("response: " + result.status)
            alert(result.message);

        })

    }

    setRoommateChoice(event)
    {
        console.log("test");
        this.setState({user_id: event})
       

    }
    render() {
        return (

        <div>
            <div clasName="roommate-container">
                <div className="wrapper">
                    <form>
                        
                        <input className = "container-object search-bar" onChange= {this.setSearchText} type="text" placeholder="Please enter a name you wish to search"/>


                    </form>
                        <button className ="container-object" id = "primary-button"type ="submit" onClick ={this.submitSearchText}>search</button>

                        </div>
                
                
                        
                            <div className="container-results">
                                { this.printResults() } 
                            </div>
                        
            </div>
         </div>
            
            );
    }
}
