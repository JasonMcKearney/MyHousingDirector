import React, { Component } from "react";
import { Input, Table, Button, Modal, Descriptions } from "antd";
import "antd/dist/antd.css";
import "./Search.css";
import Cookies from "js-cookie";

const { Search } = Input;
export default class search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      searchResults: "",
      user_id: 0,
      studentName: "",
      email:"",
      studentlist: [],
      studentObj: { username: "", user_id: "" ,email:""},
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
      email:this.state.email,
    };

    //this.setState({studentObj: newstudentObj} )

    console.log("New-Object " + newstudentObj.username);

    let newStudentlist = this.state.studentlist;

    for (var i = 0; i < newStudentlist.length; i++) {
      console.log("New Student List");
      console.log("-----------------------------");
      console.log(newStudentlist[i].username);
      console.log("-----------------------------\n");
    }
    console.log(newStudentlist.push(newstudentObj));

    for (var i = 0; i < this.state.studentlist.length; i++) {
      console.log("The State List");
      console.log("-----------------------------");
      console.log(this.state.studentlist[i].username);
      console.log("-----------------------------");
    }

    this.setState({
        studentlist: JSON.parse(JSON.stringify(newStudentlist)),
    });
  }

  // Returns list of students in a list format and updates cookies for later use throughout the application
  listItems() {
    let studentlist = this.state.studentlist;
    const columns = [
      {
        title: "ID",
        dataIndex: "user_id",
        //   render: (text) => <a>{text}</a>,
      },
      {
        title: "Username",
        dataIndex: "username",
        //   render: (text) => <a>{text}</a>,
        },
        {
            title: "Email",
            dataIndex: "email",
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
        <Table columns={columns} dataSource={studentlist} pagination={false} />
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
    let studentListLength = this.state.studentlist;

    console.log("Length: " + studentListLength.length);

    // Does not allow for multiple strings to be displayed if the input has not changed by the user
    if (studentListLength == 0) {
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
          console.log("hello " + res[0].username);
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
    }
  }

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
