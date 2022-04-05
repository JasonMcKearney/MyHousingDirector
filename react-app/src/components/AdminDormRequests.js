import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./AdminDormRequests.css";
import { CommonAxisSettingsConstantLineStyle } from "devextreme-react/chart";

// Export means any module (AdminDashboard.js file in this case) can use this script by importing it
export class AdminDormRequests extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            requestList: [],
            acceptedRequestList: []
        }
    }
  
    componentDidMount()
    {
        this.GetRequests("requested")
        this.printBuildingAndStudentNames()
    }

    GetRequests(requestState)
    {
      let currentComponent = this;
      fetch('http://localhost:16648/api/Admin/GetAdminDormRequests/' + requestState, {
          mode: 'cors', // this cannot be 'no-cors'
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          method: 'GET',
      }).then(res => res.clone().json())
          .then(function (res) {
//              try
//              {
                  if(requestState == "requested")
                  {
                    // Remove requests that are already found in the requestList
                    currentComponent.removeAllInfo();
                  }
                
                // Method does not affect the original list
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
                // Alphabetize sort building names by first letter
                requestListTemp.sort((a, b) => (a.buildingName > b.buildingName) ? 1 : -1)
                console.log("requestListTemp after sort: " + JSON.stringify(requestListTemp))

                if(requestState === "accepted")
                {
                    currentComponent.setState({
                        acceptedRequestList: requestListTemp
                    });
                }
                else
                {
                    currentComponent.setState({
                        requestList: requestListTemp
                    });
                }
//              }
//              catch
//              {
//                console.log("there was an error in code above line 77!!");
//              }  
          }) 
    }

    removeAllInfo(){
        this.setState({
            requestList: [],
        });
    }


    // Declines pending requests and updates database
    DeclinePendingRequests(requestID){
        fetch('http://localhost:16648/api/Admin/DeclineDormRequest/' + requestID, {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                requestID: requestID
            })
        }).then((Response) => Response.json())
        .then((result) => {
            console.log("response: " + result.status)
            alert(result.message);
        })
    }

    // Accepts pending requests and updates database
    AcceptPendingRequest(requestID){
        fetch('http://localhost:16648/api/Admin/AcceptDormRequest/' + requestID, {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                requestID: requestID
            })
        }).then((Response) => Response.json())
        .then((result) => {
            console.log("response: " + result.status)
            alert(result.message);
        })
    }

    printResults() {
        return (
            <table>
                <thead>
                    <tr>
                        <td className ="table-head">StudentName</td>
                        <td className ="table-head">BuildingName</td>
                        <td className ="table-head">Room Number</td>
                        <td className ="table-head">Accept</td>
                        <td className ="table-head">Decline</td>
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
                                <td className="result-word">
                                    <button className="accept-icon">
                                        {" "}
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                this.AcceptPendingRequest(val.request_ID)
                                                this.GetRequests("requested")
                                            }}
                                            type="submit"
                                            icon={faCheck}
                                            //size="2x"
                                            color="green"
                                        />
                                    </button>
                                </td>
                                <td className="result-word">    
                                    <button className="delete-icon">
                                        {" "}
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                this.DeclinePendingRequests(val.request_ID)
                                                this.GetRequests("requested")
                                            }}
                                            type="submit"
                                            icon={faTrash}
                                            //size="1x"
                                            color="green"
                                        />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );        
    }

    printBuildingAndStudentNames() {
        this.GetRequests("accepted");
        console.log("-----------------made it to line 173, printBuildingAndStudentNames() function--------------")
        // Create object names buildings
            // has member variables of list that holds names

        // Get copy of requestList without changing
        var buildingStudentNamesList = this.state.acceptedRequestList.slice();


/*
        // Find building names and what student lives in which building, their dorm room number
        for(var counter = 0; counter < this.state.requestList.length(); counter++)
        {
            // Index matches one student in studentNameList and in roomNumberList
            var buildingObject = 
            {
                buildingName: this.state.requestList[counter].buildingName,
                studentNameList: this.state.requestList[counter].studentName,
                roomNumberList: this.state.requestList[counter].roomNumber
            };
            buildingStudentNamesList.push(buildingObject)
        }       
*/        
        return (
            <tbody>
                {this.state.buildingStudentNamesList.map((val, index) => {
                    return (
                        <ul>
                            {buildingStudentNamesList.val.buildingName}
                        <ul>
                            {buildingStudentNamesList.val.studentNameList[index]} + {buildingStudentNamesList.val.roomNumberList[index]}
                        </ul>
                    </ul>
                    );
                })}
            </tbody>  
        )
    }


        
    render(){
        return(
            <div class="container">
                <div className="container-results" style={{width:'80%'}}>{this.printResults()}</div>
             {/*   <div class="requests-box">
                    <div style={{padding:'10%', paddingTop:'14%'}}>test</div>
                </div>
        */}
            <div class="container-BuildingDataBox">
                <label style={{paddingTop:'3%'}}>Accepted Dorm Requests per Student</label>
                <div class="buildingStudentList-div">
                    
                </div>
            </div>
        </div>    
    );
  }
}
