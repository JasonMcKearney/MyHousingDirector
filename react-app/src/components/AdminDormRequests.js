import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./AdminDormRequests.css";

// Export means any module (AdminDashboard.js file in this case) can use this script by importing it
export class AdminDormRequests extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            requestList: []
        }
      }
  
  
    componentDidMount()
    {
        this.GetRequests()
    }

    GetRequests()
    {
      let currentComponent = this;
      console.log("Made it to FindData() function!!");
      
      fetch('http://localhost:16648/api/Admin/GetAdminDormRequests', {
          mode: 'cors', // this cannot be 'no-cors'
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          method: 'GET',
      }).then(res => res.clone().json())
          .then(function (res) {
              console.log("res: " + JSON.stringify(res));
              console.log("res: " + res);
              try
              {
                console.log("List with contents inside: " + currentComponent.state.requestList)
                currentComponent.removeAllInfo();
                // method does not affect the original list
                var requestListTemp = currentComponent.state.requestList.slice();
                console.log("List with nothing in it: " + requestListTemp)
                
                console.log("res.length: " + res.length)
                var i;
                for (i = 0; i < res.length; i++) {
                    console.log("---------record_ID: " + res[0].submissionState)
                    const newRequestObj = {
                        record_ID: res[i].record_ID,
                        buildingName: res[i].buildingName,     
                        floorNumber: res[i].floorNumber,
                        roomNumber: res[i].roomNumber,
                        studentName: res[i].studentName,
                        submissionState: res[i].submissionState
                    };
                    console.log(newRequestObj);
                    requestListTemp.push(newRequestObj);
                }
                currentComponent.setState({
                    requestList: requestListTemp,
                });
        
                console.log("items added to the list");
              }
              catch
              {
                console.log("there was an error in code above line 66!!");
              }  
          }) 
    }

    removeAllInfo(){
        this.setState({
            requestList: [],
        });
    }
    
    // Delete requests, then call Get requests function above
    DeletePendingRequests(requestID){
        console.log(requestID)
        console.log("funciton reached")
        fetch('http://localhost:16648/api/Student/DeleteRoommate/' + requestID, {
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

    // accept requests, then call get requests

    printResults() {
        return (
            <table>
                <thead>
                    <tr>
                        <td className ="table-head">StudentName</td>
                        <td className ="table-head">BuildingName</td>
                        <td className ="table-head">Floor Number</td>
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
                                    {val.floorNumber}
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
                                                console.log("You have clicked on Accept Request!")
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
                                                console.log("You have clicked on Delete Request!")
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
    render(){
        return(
            <div class="container">
                <div style={{borderRadius: '10px', borderWidth: '5px'}}>
                    <label style={{fontSize:'180%', paddingBottom: '1%', paddingRight:'0%', fontSize: '200%'}}><strong>Dorm Requests Page</strong></label>
                </div>
                <div className="container-results" style={{width:'80%'}}>{this.printResults()}</div>
             {/*   <div class="requests-box">
                    <div style={{padding:'10%', paddingTop:'14%'}}>test</div>
                </div>
        */}
            <div class="container-BuildingDataBox">
                <label style={{paddingTop:'3%'}}>Available Dorm Rooms</label>
                <div class="buildingStudentList-div">
                    <li>
                        building name
                        <ul>
                            studentNames - roomNumber
                        {/* {availableBuildingsList.map((data) => (
                            <li key={data.name}>
                                {data.name} ({data.numRoomsAvailable})                
                            </li>
                        ))}
                        */}
                        </ul>
                    </li>
                </div>
            </div>
        </div>    
    );
  }
}
