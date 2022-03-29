import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSubway } from "@fortawesome/free-solid-svg-icons";
import "./AdminDormRequests.css";

// Export means any module (AdminDashboard.js file in this case) can use this script by importing it
export class AdminDormRequests extends Component {
    componentDidMount()
    {
        console.log("You have reached the page!!");
    }

    printResults() {
        return (
            <table>
                <thead>
                    <tr>
                        <td className ="table-head">Full-name</td>
                        <td className ="table-head">BuildingName</td>
                        <td className ="table-head">Floor Number</td>
                        <td className ="table-head">Room Number</td>
                        <td className ="table-head">Accept</td>
                        <td className ="table-head">Decline</td>

                       
                    </tr>
                </thead>
              {/*  <tbody>
              https://fontawesome.com/icons/check?s=solid   for button
                        return (
                            <tr>
                                <td className="result-word" key={index}>
                                    {" "}
                                    test
                                </td>
                                <td className="result-word" key={index}>
                                    {" "}
                                    test
                                </td>
                                <td className="result-word" key={index}>
                                    {" "}
                                    test
                                </td>
                                <td className="result-word">
                                    <button className="add-icon">
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                console.log("you have pressed a button")
                                            }}
                                            type="submit"
                                            icon={faUserPlus}
                                            size="2x"
                                            color="green"
                                        />{" "}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            */}
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
                            studentNames
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
