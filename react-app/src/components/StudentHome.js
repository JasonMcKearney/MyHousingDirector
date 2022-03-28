import React, { Component } from "react";
import { Card } from "antd";
import "./StudentHome.css";
import Cookies from "js-cookie";
import defaultlogo from "../img/default_logo.png";
const { Meta } = Card;

export default class DormSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  }

  componentDidMount() {
    //var currentComponent = this;
    
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
        var user_id = result.user_id;

        Cookies.set("ID", ID);
        Cookies.set("FN", firstName);
        Cookies.set("LN", lastName);
        Cookies.set("EM", email);
        Cookies.set("UD", user_id);
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
            if (res.question1 == null || res.question12 == null){
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
    if(Cookies.get("survey") === "false"){
      return(
        <div className="survey-notification">Your survey is not complete. In order to select roommates, your survey must be completed.</div>
      );
    } 
  } 

  render() {
    return (
      <>
        <div className="Student-desc1">Southern New Hampshire University</div>
        <div className="Student-desc2">
          Hello { Cookies.get("FN") }! <br/>
          Welcome to My Housing Director!
        </div>
        { this.checkSurveyCompletion() }
      </>
    );
  }
}
