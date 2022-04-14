import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./AdminDormRequests.css";
import { CommonAxisSettingsConstantLineStyle } from "devextreme-react/chart";
import { waitFor } from "@testing-library/react";

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
        this.getRequestsAndBuildings();
    }

    getRequestsAndBuildings()
    {
        this.removeAllInfo();
        // Find dorm requests
        this.GetRequests("requested");

        // Find accepted dorm requests
        this.GetRequests("accepted");

        // Print data into building and student name box for accepted requests
        this.printBuildingAndStudentNames();
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
              try
              {
                  var requestListTemp;
                  if(requestState === "requested")
                  {
                    console.log("requested state")
                    // Method does not affect the original list
                    requestListTemp = currentComponent.state.requestList.slice();
                  }
                  else
                  {
                    requestListTemp = currentComponent.state.acceptedRequestList.slice();
                  }
                     
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

                // Sets lists accordingly
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
              }
              catch
              {
                console.log("there was an error in code above line 77!!");
              }  
          }) 
    }

    removeAllInfo(){
        this.setState({
            requestList: [],   
            acceptedRequestList: [] 
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
            // Refreshes the page
            window.location.reload(false);  
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
            // Reloads page
            window.location.reload(false);
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
   
    printBuildingAndStudentNames() 
    {
        // Get copy of requestList without changing
        var buildingStudentNamesList = this.state.acceptedRequestList.slice();
        var retrieveNextBuildingBool = true;
        console.log("list of request accepts: " + JSON.stringify(this.state.acceptedRequestList))
        return (
            <tbody>
                {/*Iterates through acceptedRequestList*/}
                {this.state.acceptedRequestList.map((val, index, elements) => {
                    console.log("buildingName with index " + val.buildingName[0])
                    var nextElement = elements[index + 1];

                    // Prints first building name and data on screen
                    if(index != 0)
                    {
                        // Next element, values are out of bounds of list
                        if(nextElement != undefined)
                        {
                            // Check current building name with previous
                            if(val.buildingName == elements[index - 1].buildingName)
                            {
                                // Does not display building name on screen
                                retrieveNextBuildingBool = false;
                            }
                            else
                            {
                                retrieveNextBuildingBool = true;    
                            }
                        }
                        else
                        {
                            if(val.buildingName == elements[index - 1].buildingName)
                            {
                                retrieveNextBuildingBool = false;
                            }
                            else
                            {
                               retrieveNextBuildingBool = true;        
                            }
                        }
        
                    }

                    return (                        
                        <ul>
                            { retrieveNextBuildingBool == true && 
                                <label>{val.buildingName}</label>
                            }

                            <ul>
                                {val.studentName} - Room # {val.roomNumber}
                            </ul>
                        </ul>
                    );
                })}
            </tbody>
        );        
    }
       
    render(){
        return(
            <div class="container">
                <div className="requestscontainer-results" style={{width:'80%'}}>{this.printResults()}</div>
                
            <div class="container-BuildingDataBox">
                <label style={{paddingTop:'3%'}}>Accepted Dorm Requests per Student</label>
                <div class="buildingStudentList-div">
                    {this.printBuildingAndStudentNames()}
                </div>
            </div>
        </div>    
    );
  }
}
