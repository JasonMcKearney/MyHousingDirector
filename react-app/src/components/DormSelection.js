import React, { Component } from "react";
import {
    Steps,
    Button,
    message,
    Radio,
    Modal,
    Form,
    Select,
    Input,
    Descriptions,
} from "antd";
import Cookies from "js-cookie";

import dormpic from "../img/dorm.png";
import "./DormSelection.css";

const { Step } = Steps;

// What section the user is at currently
const steps = [
    {
        title: "Dorm",
        content: "First-content",
    },
    {
        title: "Floor",
        content: "Second-content",
    },
    {
        title: "Room",
        content: "Last-content",
    },
];

const { Option } = Select;

export default class DormSelection extends Component {
    constructor(props) {
        super(props);

        // Initializing the state
        this.state = {
            current: 0,
            // 空白处内容展示
            currentDescriptions: {
                desc: "description",
                imgSrc: dormpic,
            },
            dorm: "",
            floor: "",
            room: "",
            buildingData: [],
            floorData: [],
            roomData: [],
            showModal: false,
        };
    }

    // Find Building that dorm will be in
    // https://stackoverflow.com/questions/48921992/react-js-adding-new-object-to-an-array
    findBuildingInfo() {
        let currentComponent = this;
        // Empty the array, if user goes back to select floor, will not show duplicates

        // fetch('http://localhost:16648/api/Student/FindBuildingInfo/', {
        //     mode: 'cors', // this cannot be 'no-cors'
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     method: 'GET',
        // }).then(res => res.clone().json())
        //     .then(function (res) {
        //         const newArray = currentComponent.state.buildingData.slice(); // Create a copy of the array in state
        //         var i;
        //         // Loop through each object taht is in JSON
        //         for (i = 0; i < res.length; i++) {
        //             let obj = {
        //                 label: res[i].name,
        //                 value: res[i].name,
        //                 description: res[i].description,
        //                 url: res[i].url,
        //                 dormID: res[i].dorm_id,
        //             }
        //             newArray.push(obj)  // Push the object
        //         }
        //         // Update the buildingData Object array
        //         currentComponent.setState({ buildingData: newArray })
        //     })
    }

    // Get dorm info from Database when the component is rendered
    componentDidMount() {
        this.findBuildingInfo();
    }

    handleDorm = (val) => {
        this.setState({ dorm: val });
    };

    handleFloor = (val) => {
        this.setState({ floor: val });
    };

    handleRoom = (val) => {
        this.setState({ room: val });
    };

    findFloorInfo() {
        let currentComponent = this;

        console.log("this.state.floorData.length: " + this.state.floorData.length);
        this.state.floorData.length = 0;

        fetch("http://localhost:16648/api/Student/findFloorInfo/", {
            mode: "cors", // this cannot be 'no-cors'
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                dorm_id: Cookies.get("buildingID"),
                // ***********************PLACEHOLDER FOR NOW, WAITING FOR COOKIE TO BE CREATED************
                numRoommates: 2,
            }),
        })
            .then((res) => res.clone().json())
            .then(function (res) {
                const newArray = currentComponent.state.floorData.slice(); // Create a copy of the array in state
                var loopData = "";
                var i;
                // Loop through each object that is in JSON
                for (i = 0; i < res.length; i++) {
                    let obj2 = {
                        label: res[i].floorNumber,
                        value: res[i].floorNumber,
                        dormID: currentComponent.state.dorm,
                    };
                    newArray.push(obj2); // Push the object
                }
                // Update the floorData Object array
                currentComponent.setState({ floorData: newArray });
            });
        console.log("this.state.floorData.length: " + this.state.floorData.length);
    }

    findRoomInfo() {
        let currentComponent = this;
        currentComponent.state.roomData.length = 0;
        fetch("http://localhost:16648/api/Student/FindRoomInfo", {
            mode: "cors", // this cannot be 'no-cors'
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                dorm_id: Cookies.get("buildingID"),
                floorNumber: this.state.floor,
                // ***********************PLACEHOLDER FOR NOW, WAITING FOR COOKIE TO BE CREATED************
                numRoommates: 2,
            }),
        })
            .then((res) => res.clone().json())
            .then(function (res) {
                const newArray = currentComponent.state.roomData.slice(); // Create a copy of the array in state
                var i;
                for (i = 0; i < res.length; i++) {
                    let obj2 = {
                        // Below represent an object that contains most of the fields in the room_tbl in a list. Can access roomNumber by doing "this.state.roomData[0].value"
                        label: res[i].roomNumber,
                        value: res[i].roomNumber,
                        roomID: res[i].room_id,
                        maxOccupants: res[i].maxOccupants,
                        description: res[i].roomDescription,
                    };

                    console.log("RoomNumber: " + res[i].roomNumber);
                    newArray.push(obj2); // Push the object
                }
                // Update the roomData Object array
                currentComponent.setState({ roomData: newArray });
            });
    }

    next = () => {
        let { current, dorm, floor, buildingData, floorData, room, roomData } =
            this.state;

        if (current == 0) {
            if (!dorm) {
                message.error("You Must Select a Dorm!");
                return;
            }
            // User already selected the dorm
            else {
                var counter = 0;
                var bLoop = true;
                while (bLoop) {
                    // Check if the user can select the floor
                    if (buildingData[counter].value == dorm) {
                        var id = buildingData[counter].dormID;
                        bLoop = false;
                    } else {
                        counter++;
                    }
                }
                Cookies.set("buildingID", buildingData[counter].dormID);

                /*                this.setState((preState) => {
                            return {
                                current: preState.current + 1,
                            };
                        });
        */
                this.setState({ current: this.state.current + 1 }, () => {
                    console.log(this.state.current, "in next(): current: ");
                });
            }
        }

        this.findFloorInfo();
        if (current == 1 || Cookies.get("buildingID") != "") {
            if (!floor) {
                message.error("You Must Select a Floor!");
                return;
            }
            /*            this.setState((preState) => {
                      return {
                          current: preState.current + 1,
                      };
                  });
      */
            this.setState({ current: this.state.current + 1 }, () => {
                console.log(this.state.current, "in next(): current: ");
            });
        }

        this.findRoomInfo();
        if (current == 2 || floorData.length > 0) {
            if (!room) {
                message.error("You Must Select a Room to Continue!");
                return;
            }
            /*            this.setState((preState) => {
                      return {
                          current: preState.current + 1,
                      };
                  });
      */
        }
    };

    prev = () => {
        console.log("State of Current in prev: " + this.state.current);
        /*        this.setState((preState) => {
                return {
                    current: preState.current - 1,
                };
            });
    */
        this.setState({ current: this.state.current - 1 }, () => {
            console.log(this.state.current, "dealersOverallTotal1");
        });

        console.log("State of current - 1 : " + this.state.current);
    };

    // User will be able to submit their form for approval by an administrator
    submitForm() {
        fetch("http://localhost:16648/api/Student/SubmitDormApproval", {
            mode: "cors", // this cannot be 'no-cors'
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                // Dorm_id is the building id
                dorm_id: Cookies.get("buildingID"),
                // Value represents the room_id
                roomNumber: this.state.room,
                floorNumber: this.state.floor,
                studentName: Cookies.get("username"),
                student_id: Cookies.get("ID"),
            }),
        })
            .then((Response) => Response.json())
            .then((result) => {
                if (result.status == "Invalid") {
                    alert(result.message);
                } else {
                    this.props.history.push("/Student/home");
                    alert(result.message);
                }
            });
    }

    done = () => {
        let { room } = this.state;
        let { showModal } = this.state;
        if (!room) {
            message.error("You Must Select a Room to Submit!");
            return;
        }
        this.setState({
            showModal: true,
        });
    };

    // 请求接口
    getData = ({ id, name }) => {
        if (name == "dorm") {
            var bEnd = true;
            var nCounter = 0;
            var sToPrint;
            while (bEnd) {
                // https://www.codegrepper.com/code-examples/javascript/how+to+check+date+equality+in+react
                if (this.state.buildingData[nCounter].value === id) {
                    bEnd = false;
                    sToPrint = `${this.state.buildingData[nCounter].description +
                        "\nURL: " +
                        this.state.buildingData[nCounter].url
                        }`;
                }
                nCounter++;
            }
            return {
                desc: sToPrint,
            };
        } else if (name == "floor") {
            return {
                desc: "Nothing to show as of now...",
            };
        } else {
            var bEnd = true;
            var nCounter = 0;
            var sToPrint;
            while (bEnd) {
                // https://www.codegrepper.com/code-examples/javascript/how+to+check+date+equality+in+react
                console.log(this.state.roomData[nCounter].value + " id: " + id);
                if (this.state.roomData[nCounter].value === id) {
                    bEnd = false;
                    sToPrint = `${this.state.roomData[nCounter].description}`;
                }
                nCounter++;
            }
            return {
                desc: sToPrint,
            };
        }
    };

    onChange = (val, stateKey) => {
        this.setState({
            [stateKey]: val,
        });

        // 请求接口，以渲染右侧空白处
        const res = this.getData({ id: val, name: stateKey });
        this.setState({
            currentDescriptions: res,
        });
    };

    onFinish = (values) => {
        // 校验成功
        console.log("Success:", values);
    };

    onFinishFailed = (errorInfo) => {
        // 校验失败
        console.log("Failed:", errorInfo);
    };

    render() {
        let {
            current,
            dorm,
            floor,
            room,
            buildingData,
            floorData,
            roomData,
            showModal,
        } = this.state;
        return (
            <div className="Student-page-background">
                <div className="dormSelect">
                    <Modal
                        footer={null}
                        title="Confirm Your Information"
                        visible={showModal}
                        onOk={() => { }}
                        onCancel={() => {
                            this.setState({
                                showModal: false,
                            });
                        }}
                    >
                        <>
                            <Descriptions title="Room Info">
                                <Descriptions.Item label="Dorm">{dorm}</Descriptions.Item>
                                <Descriptions.Item label="Floor">{floor}</Descriptions.Item>
                                <Descriptions.Item label="Room">{room}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions title="User Info">
                                <Descriptions.Item label="FirstName">
                                    {Cookies.get("FN")}
                                </Descriptions.Item>
                                <Descriptions.Item label="LastName">
                                    {Cookies.get("LN")}
                                </Descriptions.Item>
                                <Descriptions.Item label="Telephone">
                                    Telephone number not saved
                                </Descriptions.Item>
                                <Descriptions.Item label="StudentID">
                                    {Cookies.get("ID")}
                                </Descriptions.Item>
                            </Descriptions>

                            <Form.Item>
                                <Button
                                    style={{
                                        marginRight: 20,
                                    }}
                                    onClick={() => {
                                        this.props.history.push("/student/home");
                                        this.submitForm();
                                    }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Submit
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.setState({
                                            showModal: false,
                                        });
                                    }}
                                    type="danger"
                                >
                                    Cancel
                                </Button>
                            </Form.Item>

                            {/* <Form
                                style={{
                                    top: 0,
                                    transform: 'translateY(0%)'
                                }}
                                // labelCol={{ span: 8 }}
                                // wrapperCol={{ span: 16 }}

                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="first name"
                                    label="first name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your first name!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" />
                                </Form.Item>
                                <Form.Item
                                    name="last name"
                                    label="last name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your last name!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" />
                                </Form.Item>

                                <Form.Item>
                                    <Button style={{
                                        marginRight: 20
                                    }} type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    <Button onClick={() => {
                                        this.setState({
                                            showModal: false
                                        })
                                    }} type="danger">
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Form> */}
                        </>
                    </Modal>
                    <Steps current={current}>
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            minHeight: 270,
                        }}
                        className="steps-content"
                    >
                        {current == 0 && (
                            <div>
                                <Select
                                    style={{ width: 120 }}
                                    onChange={(val) => {
                                        this.onChange(val, "dorm");
                                    }}
                                >
                                    {buildingData.map((v, i) => {
                                        return (
                                            <Option key={i} value={v.value}>
                                                {v.label}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                        )}

                        {current == 1 && (
                            <div>
                                <Select
                                    style={{ width: 120 }}
                                    onChange={(val) => {
                                        this.onChange(val, "floor");
                                    }}
                                >
                                    {floorData.map((v, i) => {
                                        return (
                                            <Option key={i} value={v.value}>
                                                {v.label}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                        )}

                        {current == 2 && (
                            <div>
                                <Select
                                    style={{ width: 120 }}
                                    onChange={(val) => {
                                        this.onChange(val, "room");
                                    }}
                                >
                                    {roomData.map((v, i) => {
                                        return (
                                            <Option key={i} value={v.value}>
                                                {v.label}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                        )}
                        <div
                            className="steps-content-info"
                            style={{
                                margin: "20px 0 10px 50px",
                                flex: 1,
                            }}
                        >
                            <div className="steps-content-info-words">
                                {this.state.currentDescriptions.desc}
                            </div>
                            <img src={this.state.currentDescriptions.imgSrc} />
                        </div>
                    </div>
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => this.done()}>
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
