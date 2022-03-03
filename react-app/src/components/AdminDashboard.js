import React, { Component } from "react";
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

// Export means any module (Home.js file in this case) can use this script by importing it
export class AdminDashboard extends Component {

    state = { NumStudentsInBuildings:[{
      language: 'Washington',
      percent: 100,
    }, {
      language: 'Monadnock',
      percent: 120,
    }, {
      language: 'Kingston Hall',
      percent: 300,
    }] }

    render() {
      return ( 
        <div class="container">
          <div class="totalStudents-box">
            <label style={{paddingTop:'4%'}}>Total Students on Campus</label>
            <div style={{padding:'10%'}}><h1>10</h1></div>
          </div>

          <div class="dormRequests-box">
            <label style={{paddingTop:'6%'}}>Total Dorm Requests</label>
            <div style={{padding:'2%'}}><h1>2</h1></div>
            <div style={{fontSize: '120%'}}><a class="link">See Requests</a></div> 
          </div>

          <div class="popularBuildings-box">
            <label style={{paddingTop:'4%'}}>Most Popular Building on Campus</label>
            <div style={{padding:'10%'}}><h1>Kingston</h1></div>
          </div>

          <div class="availableDormRooms-box">
            <label style={{paddingTop:'2%'}}>Available Dorm Rooms</label>
            <div class="viewDorms-div"><a class="link">View Dorms</a></div>
            <div class="buildingsList-div">
              <li>Monadnock (2)</li>
              <li>Washington (1)</li>
              <li>Kingston Hall (3)</li>
            </div>
          </div>
          
          <div class="piechart-box">
            <div class="piechart-div">
              <PieChart
                id="pie"
                type="doughnut"
                title="Maximum Number of Students in Each Building"
                palette="Bright"
                dataSource={this.state.NumStudentsInBuildings}
              >
              <Series argumentField="language" valueField="percent">
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
