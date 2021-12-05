import React, { Component } from 'react';
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
        currentDescriptions: {},
//        dorm: '',
        floor: '',
        room: '',
        dormData: [],
        floorData: [],
        roomData: [],
        showModal: false,
      }
    }

    // Find Dorm info 
// https://stackoverflow.com/questions/48921992/react-js-adding-new-object-to-an-array
    findDormInfo()
    {
        let currentComponent = this;
        fetch('http://localhost:16648/api/Student/FindDormInfo/', {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {                
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
        }).then(res=>res.clone().json())
        .then(function(res) 
        {
            const newArray = currentComponent.state.dormData.slice(); // Create a copy of the array in state
            var loopData = ''
            var i;
            // Loop through each object taht is in JSON
            for (i = 0; i < res.length; i++)
            {
                let obj = {
                    label: res[i].name,
                    value: res[i].name,
                    description: res[i].description,
                    url: res[i].url,
                    dormID: res[i].dorm_id,
                }
                newArray.push(obj)  // Push the object
            }
            // Update the dormData Object array
            currentComponent.setState({dormData: newArray})
            console.log("obj label: " + newArray[0].label)
            console.log("obj value: " + newArray[0].value)
            console.log("obj description: " + newArray[0].description)
            console.log("obj url: " + newArray[0].url)
         /*   currentComponent.setState({
                dormData: currentComponent.state.dormData.concat([newArray]) 
            })
*/
            console.log("Dorm " + currentComponent.state.dormData[0].label + " ID: " + currentComponent.state.dormData[0].dormID)
            console.log("Dorm info: " + currentComponent.state.dormData[1].value)
        })
    }

    // Get dorm info from Database when the component is rendered
    componentDidMount()
    {
        this.findDormInfo();
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

  
  


  findFloorInfo()
  {
      let currentComponent = this;
      fetch('http://localhost:16648/api/Student/FindDormInfo/', {
          mode: 'cors', // this cannot be 'no-cors'
          headers: {                
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          method: 'GET',
      }).then(res=>res.clone().json())
      .then(function(res) 
      {
          const newArray = currentComponent.state.dormData.slice(); // Create a copy of the array in state
          var loopData = ''
          var i;
          // Loop through each object taht is in JSON
          for (i = 0; i < res.length; i++)
          {
              let obj = {
                  label: res[i].name,
                  value: res[i].name,
                  description: res[i].description,
                  url: res[i].url,
                  dormID: res[i].dorm_id,
              }
              newArray.push(obj)  // Push the object
          }
          // Update the dormData Object array
          currentComponent.setState({dormData: newArray})
          console.log("obj label: " + newArray[0].label)
          console.log("obj value: " + newArray[0].value)
          console.log("obj description: " + newArray[0].description)
          console.log("obj url: " + newArray[0].url)
       /*   currentComponent.setState({
              dormData: currentComponent.state.dormData.concat([newArray]) 
          })
*/
          console.log("Dorm " + currentComponent.state.dormData[0].label + " ID: " + currentComponent.state.dormData[0].dormID)
          console.log("Dorm info: " + currentComponent.state.dormData[1].value)
      })
  }


  next = () => {
    let { current, dorm, floor } = this.state;
    if (current == 0) {
      if (!dorm) {
        message.error("You Must Select a Dorm!");
        return;
      }

      // Check if the user can select the floor
      if (dorm == "dorm1") {
        this.setState({
          floorData: [
            {
              label: "floor1",
              value: "floor1",
            },
            {
              label: "floor2",
              value: "floor2",
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
            },
            {
              label: "floor2",
              value: "floor2",
            },
            {
              label: "floor3",
              value: "floor3",
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
            },
            {
              label: "room102",
              value: "102",
            },
            {
              label: "room103",
              value: "103",
            },
            {
              label: "room104",
              value: "104",
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
            },
            {
              label: "room202",
              value: "202",
            },
            {
              label: "room203",
              value: "203",
            },
            {
              label: "room204",
              value: "204",
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
            },
            {
              label: "room102",
              value: "102",
            },
            {
              label: "room103",
              value: "103",
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
            },
            {
              label: "room202",
              value: "202",
            },
            {
              label: "room203",
              value: "203",
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
            },
            {
              label: "room302",
              value: "302",
            },
            {
              label: "room303",
              value: "303",
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

  //---------------------------------------------------------------------------
  static getDerivedStateFromProps(props, state) {
    return {fullName: props.name };
  }
  //---------------------------------------------------------------------------

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
            onOk={() => {}}
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
                minHeight: 1000,
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
                    {dormData.map((v, i) => {
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
                {this.state.currentDescriptions.desc}
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