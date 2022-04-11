import React, { Component } from "react";
import { Input, Table, Button, Modal, Descriptions } from "antd";
import "antd/dist/antd.css";
import "./Search.css";
import Cookies from "js-cookie";
import { ConstantLine } from "devextreme-react/chart";
import { List } from "react-bootstrap/lib/Media";

const { Search } = Input;
export default class search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            searchResults: "",
            user_id: 0,
            studentName: "",
            firstName: "",
            lastName: "",
            email: "",
            dorm_ID: 0,
            room_ID:0,
            studentList: [],
            studentObj: { username: "", firstName: "", lastName: "", user_id: "", email: "" },
            requestList: [],
        };

        //Student Object to store all the student data

        // Gives access to functions below...
        this.getResults = this.getResults.bind(this);
        this.searchText = this.searchText.bind(this);
        this.addItem = this.addItem.bind(this);
        this.listItems = this.listItems.bind(this);
    }

    searchText(event) {
        console.log(event.target.value)
        this.setState({ searchText: event.target.value });
        // this.setState({ studentlist: [] })
    }

    // Is called after studentName is set, adds the student to the list
    addItem() {
        const newstudentObj = {
            username: this.state.studentName,
            user_id: this.state.user_id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dorm_ID: this.state.dorm_ID,
            room_ID: this.state.room_ID,
        };

        //this.setState({studentObj: newstudentObj} )

        console.log("New-Object " + newstudentObj.username);

        let newstudentList = this.state.studentList;

        for (var i = 0; i < newstudentList.length; i++) {
            console.log("New Student List in AddItem Function");
            console.log("-----------------------------");
            console.log(newstudentList[i].username);
            console.log("-----------------------------\n");
        }
        console.log(newstudentList.push(newstudentObj));

        for (var i = 0; i < this.state.studentList.length; i++) {
            console.log("The State List");
            console.log("-----------------------------");
            console.log(this.state.studentList[i].username);
            console.log("-----------------------------");
        }

        this.setState({
            studentList: JSON.parse(JSON.stringify(newstudentList)),
        });
    }

    // Returns list of students in a list format and updates cookies for later use throughout the application
    listItems() {
        let studentList = this.state.studentList ;
        const columns = [
            {
                title: "ID",
                dataIndex: "user_id",
                //   render: (text) => <a>{text}</a>,
            },
            {
                title: "FirstName",
                dataIndex: "firstName",
                //   render: (text) => <a>{text}</a>,
            },
            {
                title: "LastName",
                dataIndex: "lastName",
                //   render: (text) => <a>{text}</a>,
            },
            {
                title: "Dorm",
                dataIndex: "dorm_ID",
                //   render: (text) => <a>{text}</a>,
            },
            {
                title: "Room",
                dataIndex: "Room_ID",
                //   render: (text) => <a>{text}</a>,
            },
            {
                title: "Action",
                render: (text, record) => (
                    <Button
                        size="small"
                        onClick={() => {
                            this.props.history.push("/home/StudentProfile");
                            Cookies.set("student", record.username);
                        }}
                    >
                        view
                    </Button>
                ),
            },
        ];

        return (
            <Table columns={columns} dataSource={studentList} pagination={false} />
            //   <Table
            //     columns={columns}
            //     dataSource={[
            //       { username: "jkbhjvghcfgcghhjknklj", user_id: "user_idjhgf" },
            //     ]}
            //     pagination={false}
            //   />
        );
    }

    // Find results if there are any in the database
    getResults() {
        let currentComponent = this;
        let studentListLength = this.state.studentList;
        

        console.log("************************Length: " + studentListLength.length);

        // Does not allow for multiple strings to be displayed if the input has not changed by the user
        // Passing parameter to Web API through address

        fetch(
            "http://localhost:16648/api/Admin/FindStudents/" +
            this.state.searchText,
            {
                mode: "cors", // this cannot be 'no-cors'
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
            }
        )
            .then((res) => res.clone().json())
            .then(function (res) {
                
                var loopData = "";
                var i;
                for (i = 0; i < res.length; i++) {
                    // console.log("Next User: " + res[i].username)
                    console.log("Next User_id: " + res[i].user_id);
                    if (res[i].username != "") {
                        currentComponent.setState({ studentName: res[i].username });
                        currentComponent.setState({ user_id: res[i].user_id });
                        currentComponent.setState({ email: res[i].email });
                        console.log("studentName" + res[i].username)
                        currentComponent.setState({ dorm_ID: res[i].dorm_ID });
                        currentComponent.setState({ room_ID: res[i].room_ID });
                        currentComponent.setState({ firstName: res[i].firstName });
                        currentComponent.setState({ lastName: res[i].lastName });
                        console.log("firstName" + res[i].username)
                        console.log("lastName" + res[i].username)
                        console.log("email" + res[i].email)
                        console.log("user_id" + res[i].user_id)
                        // Add student to list
                        currentComponent.addItem();
                    }
                    // Entries with characters entered do not match any usernames in the database
                    else alert("No entries match the character/characters entered.");
                }
                currentComponent.setState({ searchResults: loopData });
            });


        console.log("***********on line 190")
        console.log("******studentID: " + Cookies.get("ID"))
        fetch("http://localhost:16648/api/Admin/GetAdminSearchingRequests/" + this.state.user_id, {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
        }).then(res => res.clone().json())
            .then(function (res) {
                try {
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
                    }
                    // Alphabetically sort building names by first letter
                    requestListTemp.sort((a, b) => (a.buildingName > b.buildingName) ? 1 : -1)

                    console.log("------requestList" + requestListTemp)

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


/*
    StudentDormInfo() {
        let currentComponent = this;
        fetch('http://localhost:16648/api/Student/GetAdminSearchingRequests/' + Cookies.get("ID"), {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
        }.then(res => res.clone().json())
            .then(function (res) {
                try {
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
            }));
       }*/

    render() {
        return (
            <div className="container-search">
                <div>
                    <h1>Search</h1>
                    <Search
                        onChange={this.searchText}
                        placeholder="Please input a Students name or ID"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={this.getResults}
                        style={{ margin: "0 0 30px 0 " }}
                    />
                </div>
                <section>
                    <div>
                        <div className="resultsBox">{this.listItems()}</div>
                    </div>
                </section>
            </div>
        );
    }
}


