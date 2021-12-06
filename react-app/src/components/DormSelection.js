import react, { Component } from "react";
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
import dorm1 from '../img/loginpic1.png';
import dorm2 from '../img/loginpic2.JPG';
import floor1 from '../img/logo.png';
import floor2 from '../img/logo.png';
import room1 from '../img/logo.png';
import room2 from '../img/logo.png';
import "./DormSelection.css";

const { Step } = Steps;

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

        //  fetch('http://localhost:16648/api/Student/', {
        //      headers: {
        //          'Content-Type': 'application/json',
        //          'Accept': 'application/json'
        //          },
        //      method: 'POST',
        //      body: JSON.stringify({
        //          username: Cookies.get("username")
        //      })
        //        }).then((Response) => Response.json())
        //  .then((result) => {
        //      var ID = result.studentID;
        //      var firstName = result.firstName;
        //      var lastName = result.lastName;

        //      Cookies.set("ID", ID);
        //      Cookies.set("FN", firstName);
        //      Cookies.set("LN", lastName);
        //  })
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

    state = {
        current: 0,
        // 空白处内容展示
        currentDescriptions: {},
        currentImg: '',
        dorm: "",
        floor: "",
        room: "",
        dormData: [
            {
                label: "dorm1",
                value: "dorm1",
                url: dorm1
            },
            {
                label: "dorm2",
                value: "dorm2",
                url: dorm2
            },
        ],
        floorData: [],
        roomData: [],
        showModal: false,
    };

    next = () => {
        let { current, dorm, floor } = this.state;
        if (current == 0) {
            if (!dorm) {
                message.error("You Must Select a Dorm!");
                return;
            }

            if (dorm == "dorm1") {
                this.setState({
                    floorData: [
                        {
                            label: "floor1",
                            value: "floor1",
                            url: floor1
                        },
                        {
                            label: "floor2",
                            value: "floor2",
                            url: floor2
                        },
                    ],
                });
            }

            if (dorm == "dorm2") {
                this.setState({
                    floorData: [
                        {
                            label: "floor1",
                            value: "floor1",
                            url: floor1
                        },
                        {
                            label: "floor2",
                            value: "floor2",
                            url: floor2
                        },
                        {
                            label: "floor3",
                            value: "floor3",
                            url: floor1
                        },
                    ],
                });
            }
            this.setState((preState) => {
                return {
                    current: preState.current + 1,
                };
            });
        }
        if (current == 1) {
            if (!floor) {
                message.error("You Must Select a floor!");
                return;
            }
            if (floor == "floor1" && dorm == "dorm1") {
                this.setState({
                    roomData: [
                        {
                            label: "room101",
                            value: "101",
                            url: room1
                        },
                        {
                            label: "room102",
                            value: "102",
                            url: room2
                        },
                        {
                            label: "room103",
                            value: "103",
                            url: room1
                        },
                        {
                            label: "room104",
                            value: "104",
                            url: room2
                        },
                    ],
                });
            }

            if (floor == "floor2" && dorm == "dorm1") {
                this.setState({
                    roomData: [
                        {
                            label: "room201",
                            value: "201",
                            url: room1
                        },
                        {
                            label: "room202",
                            value: "202",
                            url: room2
                        },
                        {
                            label: "room203",
                            value: "203",
                            url: room1
                        },
                        {
                            label: "room204",
                            value: "204",
                            url: room2
                        },
                    ],
                });
            }

            if (floor == "floor1" && dorm == "dorm2") {
                this.setState({
                    roomData: [
                        {
                            label: "room101",
                            value: "101",
                            url: room1
                        },
                        {
                            label: "room102",
                            value: "102",
                            url: room1
                        },
                        {
                            label: "room103",
                            value: "103",
                            url: room1
                        },
                    ],
                });
            }

            if (floor == "floor2" && dorm == "dorm2") {
                this.setState({
                    roomData: [
                        {
                            label: "room201",
                            value: "201",
                            url: room2
                        },
                        {
                            label: "room202",
                            value: "202",
                            url: room1
                        },
                        {
                            label: "room203",
                            value: "203",
                            url: room1
                        },
                    ],
                });
            }

            if (floor == "floor3" && dorm == "dorm2") {
                this.setState({
                    roomData: [
                        {
                            label: "room301",
                            value: "301",
                            url: room1
                        },
                        {
                            label: "room302",
                            value: "302",
                            url: room1
                        },
                        {
                            label: "room303",
                            value: "303",
                            url: room1
                        },
                    ],
                });
            }
            this.setState((preState) => {
                return {
                    current: preState.current + 1,
                };
            });
        }
    };

    prev = () => {
        this.setState((preState) => {
            return {
                current: preState.current - 1,
            };
        });
    };

    done = () => {
        let { room } = this.state;
        let { showModal } = this.state;
        if (!room) {
            message.error("You Must Select a Room!");
            return;
        }
        this.setState({
            showModal: true,
        });
    };

    // 请求接口
    getData = ({ id, name }) => {
        return {
            desc: `${name}: ${id} some info...`,
        };
    };

    onChange = (val, stateKey) => {
        this.setState({
            [stateKey]: val.split('-')[0],
        });

        // 请求接口，以渲染右侧空白处
        const res = this.getData({ id: val.split('-')[0], name: stateKey });
        this.setState({
            currentDescriptions: res,
            currentImg: val.split('-')[1]
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
            dormData,
            floorData,
            roomData,
            showModal,
        } = this.state;
        return (
            <div className="dormSelect">
                <Modal
                    footer={null}
                    title="Confirm Your infomation"
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
                                3123212132
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
                        minHeight: 600,
                    }}
                    className="steps-content"
                >
                    {current == 0 && (
                        <div>
                            <Select
                                style={{ width: 120 }}
                                onChange={(val) => {
                                    console.log("val = ", val)
                                    this.onChange(val, "dorm");
                                }}
                            >
                                {dormData.map((v, i) => {
                                    return (
                                        <Option key={i} value={`${v.value}-${v.url}`}>
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
                                        <Option key={i} value={`${v.value}-${v.url}`}>
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
                                        <Option key={i} value={`${v.value}-${v.url}`}>
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
                        {this.state.currentDescriptions.desc}
                        <div>
                            <img style={{
                                width: 300,

                            }} src={this.state.currentImg} />
                        </div>
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
        );
    }
}
