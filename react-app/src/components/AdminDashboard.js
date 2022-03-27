import React, { Component } from "react";
import { Link } from "react-router-dom";
// How to make the piechart.. https://js.devexpress.com/Demos/WidgetsGallery/Demo/Charts/DoughnutWithTopNSeries/React/Light/
// Installed PieChart by using this https://js.devexpress.com/Documentation/Guide/React_Components/Add_DevExtreme_to_a_React_Application/
import PieChart, {
  Legend,
  Series,
  Export,
  Label,
  SmallValuesGrouping,
  Connector,
} from 'devextreme-react/pie-chart';
import "./AdminDashboard.css";

// Export means any module (AdminDashboard.js file in this case) can use this script by importing it
export class AdminDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
        totalStudents: 0,
        totalDormRqsts: 0,
        popularBuilding: '',
        availableBuildingsList: [],
        numStdntsInBuildingsList: [],
        message: "",
        showModal: false,
        // Used for pie graph data
        NumStudentsInBuildings:[]
    }
  }
 

  componentDidMount()
  {
    this.FetchData();
  }

  FetchData()
  {
      let currentComponent = this;
      console.log("Made it to FindData() function!!");
      
      fetch('http://localhost:16648/api/Admin/GetAdminDashboardData', {
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
                // Gets values from database to populate AdminDashboard page
                console.log("nTotalStudents: " + res.nTotalStudents);
                currentComponent.setState({ totalStudents: res.nTotalStudents });
                currentComponent.setState({ totalDormRqsts: res.nTotalDormRqsts });
                currentComponent.setState({ popularBuilding: res.sPopularBuilding });
                currentComponent.setState({ availableBuildingsList: res.availableBuildingsList });
                currentComponent.setState({ totalStdntsInBuildingsList: res.totalStdntsInBuildingsList });
                const newArray = currentComponent.state.numStdntsInBuildingsList.slice(); // Create a copy of the array in state

                // Loop through each object that is in totalStdntsInBuildings list in JSON to display data in pie chart
                for (var i = 0; i < res.totalStdntsInBuildingsList.length; i++) 
                {
                  console.log(res.totalStdntsInBuildingsList[i].name)
                  let obj = {
                      buildingName: res.totalStdntsInBuildingsList[i].name,
                      numStudents: res.totalStdntsInBuildingsList[i].sizeBuilding,
                  }
                  newArray.push(obj)  // Push the object
                }

                // Update the NumStudentsInBuildings Object array
                currentComponent.setState({ numStdntsInBuildingsList: newArray })
              }
              catch
              {
                console.log("there was an error in code above line 80!!");
              }  
          })
  }
    
    render() {
      let {
        totalStudents,
        totalDormRqsts,
        popularBuilding,
        availableBuildingsList,
        numStdntsInBuildingsList,
      } = this.state;

       return ( 
        <div class="container">
              <div class="totalStudents-box">
                  <Link >
                  <label style={{paddingTop:'4%'}}>Total Students on Campus</label>
            <div style={{padding:'10%', paddingTop:'14%'}}><h1>{totalStudents}</h1></div>
                  </Link>
          </div>

              <div class="dormRequests-box" >
                  <Link >
            <label style={{paddingTop:'6%'}}>Total Dorm Requests</label>
            <div style={{padding:'0%', paddingTop:'10%'}}><h1>{totalDormRqsts}</h1></div>
                      <div style={{ fontSize: '120%' }}><a class="link">See Requests</a></div> 
                  </Link >
          </div>

              <div class="popularBuildings-box">
                  <Link >
                      <label style={{paddingTop:'4%'}}>Most Popular Building on Campus</label>
            <div style={{padding:'10%', marginTop:'-3%'}}><h1>{popularBuilding}</h1></div>
                      </Link >
          </div>

          <div class="availableDormRooms-box">
            <label style={{paddingTop:'2%'}}>Available Dorm Rooms</label>
            <div class="viewDorms-div"><a class="link">View Dorms</a></div>
            <div class="buildingsList-div">
              <ul>
                {availableBuildingsList.map((data) => (
                  <li key={data.name}>
                    {data.name} ({data.numRoomsAvailable})                
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div class="piechart-box">
            <div class="piechart-div">
              <PieChart
                id="pie"
                type="doughnut"
                title="Maximum Number of Students in Each Building"
                palette="Bright"
                dataSource={numStdntsInBuildingsList}
              >
              <Series argumentField="buildingName" valueField="numStudents">
                <SmallValuesGrouping mode="topN" topCount={3} />
                <Label
                  visible={true}
                  format="fixedPoint"
                  customizeText={this.customizeLabel}
                >
                  <Connector visible={true} width={2} />
                </Label>
              </Series>
              <Export enabled={true} />
              <Legend horizontalAlignment="center" verticalAlignment="bottom"/>`
            </PieChart>
          </div>
        </div>
      </div>
    );
  }
  customizeLabel(point) {
    return `${point.argumentText}: ${point.valueText} students`;
  }
}
