import React, { Component } from "react";
import { Card } from "antd";
import "./StudentHome.css";
import Cookies from "js-cookie";
import defaultlogo from "../img/default_logo.png";
import { fixControlledValue } from "antd/lib/input/Input";
const { Meta } = Card;

export default class DormSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      firstName: "",
      lastName: "",
      email: "",
      userMessage: "",
      requestList: []
    };
  }
 
  componentDidMount() {
    this.setCookiesAndGetRequests();
  }

  setCookiesAndGetRequests()
  {
    this.setCookies();
    // Get dorm requests
    this.GetRequests(); 
  }

  setCookies()
  {
    var user_id;
    fetch('http://localhost:16648/api/Student/', {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
          username: Cookies.get("username")
      })
    }).then((Response) => Response.json())
    .then((result) => {
        var ID = result.studentID;
        var firstName = result.firstName;
        var lastName = result.lastName;
        var email = result.email
        user_id = result.user_id;

        Cookies.set("ID", ID);
        Cookies.set("FN", firstName);
        Cookies.set("LN", lastName);
        Cookies.set("EM", email);
        Cookies.set("UD", user_id);
        this.checkSurveyCompletion();
      });
  }
  checkSurveyCompletion(){
    fetch(
      "http://localhost:16648/api/Student/getCurrentSurveyQuestions/" + Cookies.get("UD"),
      {
          mode: "cors", // this cannot be 'no-cors'
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
          },
          method: "POST",
      }).then(res=>res.clone().json())
      .then((res) => {
        if (res.question1 === null || res.question2 === null || res.question3 === null  || res.question4 === null || res.question5 === null || res.question6 === null || res.question7 === null  || res.question8 === null  || res.question9 === null  || res.question10 === null || res.question11 === null || res.question12 === null){
              var surveyStatus = false;
            }
            else{
              var surveyStatus = true;
            }
            Cookies.set("survey", surveyStatus);
      });

      fetch(
        "http://localhost:16648/api/Student/getCurrentSurveyQuestions/" + Cookies.get("UD"),
        {
            mode: "cors", // this cannot be 'no-cors'
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },

            method: "POST",
        } 
    ).then(res=>res.clone().json())  
        .then((res) => {
            Cookies.set("Question1", res.question1);
            Cookies.set("Question2", res.question2);
            Cookies.set("Question3", res.question3);
            Cookies.set("Question4", res.question4);
            Cookies.set("Question5", res.question5);
            Cookies.set("Question6", res.question6);
            Cookies.set("Question7", res.question7);
            Cookies.set("Question8", res.question8);
            Cookies.set("Question9", res.question9);
            Cookies.set("Question10", res.question10);
            Cookies.set("Question11", res.question11);
            Cookies.set("Question12", res.question12);
          });
        };

    surveyError(){
    if(Cookies.get("survey") === "false"){
      return(
        <div className="survey-notification">Your survey is not complete. In order to select roommates or your dorm location, your survey must be completed.</div>
      );
    } 
  } 

  GetRequests()
    {
      let currentComponent = this;
      fetch('http://localhost:16648/api/Student/getStudentDormRequests/' + Cookies.get("ID"), {
          mode: 'cors', // this cannot be 'no-cors'
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          method: 'GET',
      }).then(res => res.clone().json())
          .then(function (res) {
              try
              {
                    var requestListTemp = currentComponent.state.requestList.slice();                                       
                    var i;
                    for (i = 0; i < res.length; i++) {
                        const newRequestObj = {
                            request_ID: res[i].request_ID,
                            buildingName: res[i].buildingName,     
                            roomNumber: res[i].roomNumber,
                            studentName: res[i].studentName,
                            submissionState: res[i].submissionState
                        };
                        requestListTemp.push(newRequestObj);
                    }
                
                // Alphabetically sort building names by first letter
                requestListTemp.sort((a, b) => (a.buildingName > b.buildingName) ? 1 : -1)
               
                currentComponent.setState({
                    requestList: requestListTemp
                });
              }
              catch
              {
                console.log("there was an error in code above line 154!!");
              }  
          }) 
  } 
  
/* use this in code.... 
   // Refreshes the page
    window.location.reload(false);
*/

  // Print out requests on Student home page
  printResults() { 
    console.log("**************requestList: " + JSON.stringify(this.state.requestList))

    if(Cookies.get("survey") === "true")
    {       
      if(this.state.requestList.length > 0)
      {
        return (
          <div className="container-results" style={{marginLeft: '20%', marginTop: '30%', position: 'fixed', height: '30%', width:'60%'}}>
            <div style={{textAlign:'center', fontSize:'220%'}}>
              Dorm Selection Requests
            </div>
          <table>
              <thead>
                  <tr>
                      <td className ="table-head">StudentName</td>
                      <td className ="table-head">BuildingName</td>
                      <td className ="table-head">Room Number</td>
                      <td className="table-head">Submission State</td>
                  </tr>
              </thead>
              <tbody>
                  {this.state.requestList.map((val, index) => {
                      return (
                          <tr>
                              <td className="result-word" key={index}>
                                  {" "}
                                  {val.studentName}
                              </td>
                              <td className="result-word" key={index}>
                                  {" "}
                                  {val.buildingName}
                              </td>
                              <td className="result-word" key={index}>
                                  {" "}
                                  {val.roomNumber}
                              </td>  
                              <td className="result-word" key={index}>
                                  {" "}
                                  {val.submissionState}
                              </td>     
                          </tr>
                      );
                  })}
              </tbody>
          </table>
        </div>
        )
      }
      else
      {
        // Reloads the page once
        console.log(window.location.hash)
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload(false);
        }
        
        return(
          <div className="container-results" style={{marginLeft: '20%', marginTop: '28%', position: 'fixed', height: '30%', width:'60%'}}>
            <div classname="container-results" style={{textAlign:'center', fontSize:'220%'}}>
              Dorm Selection Requests
            </div>
          <table>
              <thead>
                  <tr>
                      <td className ="table-head">StudentName</td>
                      <td className ="table-head">BuildingName</td>
                      <td className ="table-head">Room Number</td>
                      <td className="table-head">Submission State</td>
                  </tr>
              </thead>
              <tbody>  
                  <tr>
                      <td className="result-word">
                        {"N/A"}
                      </td>
                      <td className="result-word">
                        {"N/A"}
                      </td>
                      <td className="result-word">
                        {"N/A"}
                      </td>  
                      <td className="result-word">
                        {"N/A"}
                      </td>     
                  </tr>
              );  
              </tbody>
          </table>
        </div>
        );
      }
  }        
}

  render() {
    return (
      <>
        <div className="Student-desc1">Southern New Hampshire University<p>Office of Residence Life</p></div>
        <div className="Student-desc2">
          Hello { Cookies.get("FN") }! <br/>
          Welcome to My Housing Director!
        </div>
        { this.surveyError() }
        
        { this.printResults() }
      </>
    );
  }
}