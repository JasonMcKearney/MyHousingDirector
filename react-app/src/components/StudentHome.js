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
    var currentComponent = this;
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
                    var email = result.email;
    
                  console.log("StudentID: " + result.studentID)
                  currentComponent.setState({studentID: result.studentID})
                  console.log(currentComponent.studentID)

                  currentComponent.setState({firstName: result.firstName})

                  this.state.lastName = result.lastName;
                  this.state.email = result.email;

                  console.log("StudentID: " + this.state.studentID)

                  Cookies.set("ID", result.studentID);
                  Cookies.set("FN", result.firstName);
                  Cookies.set("LN", result.lastName);
                  Cookies.set("EM", result.email);
              })
  }

  render() {
    return (
      <>
        <div className="Student-desc1">Southern New Hampshire University</div>
        <div className="Student-desc2">
          Hi User! <br/>
          Welcome to MyHousing Director!
        </div>

      </>
    );
  }
}
