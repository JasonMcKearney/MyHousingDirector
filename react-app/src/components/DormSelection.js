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
        dorm: '',
        floor: '',
        room: '',
        buildingData: [],
        floorData: [],
        roomData: [],
        showModal: false,
      }
    }

    // Find Building that dorm will be in 
// https://stackoverflow.com/questions/48921992/react-js-adding-new-object-to-an-array
    findBuildingInfo()
    {
        let currentComponent = this;
        fetch('http://localhost:16648/api/Student/FindBuildingInfo/', {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {                
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
        }).then(res=>res.clone().json())
        .then(function(res) 
        {
            const newArray = currentComponent.state.buildingData.slice(); // Create a copy of the array in state
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
            // Update the buildingData Object array
            currentComponent.setState({buildingData: newArray})
        })
    }

    // Get dorm info from Database when the component is rendered
    componentDidMount()
    {
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


  findFloorInfo()
  {
      let currentComponent = this;
      fetch('http://localhost:16648/api/Student/findFloorInfo/'+Cookies.get("buildingID"), {
          mode: 'cors', // this cannot be 'no-cors'
          headers: {                
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          method: 'GET',
      }).then(res=>res.clone().json())
      .then(function(res) 
      {
          const newArray = currentComponent.state.floorData.slice(); // Create a copy of the array in state
          var loopData = ''
          var i;
          // Loop through each object that is in JSON
          for (i = 0; i < res.length; i++)
          {
              let obj2 = {
                  label: res[i].floorNumber,
                  value: res[i].floorNumber,
                  dormID: currentComponent.state.dorm,
              }
              newArray.push(obj2)  // Push the object
          }
          // Update the floorData Object array
          currentComponent.setState({floorData: newArray})   
      })
  }

  findRoomInfo()
  {
      let currentComponent = this;
      fetch('http://localhost:16648/api/Student/FindRoomInfo', {
          mode: 'cors', // this cannot be 'no-cors'
          headers: {                
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            dorm_id: Cookies.get("buildingID"),
            floorNumber: this.state.floor
        })
      }).then(res=>res.clone().json())
      .then(function(res) 
      {
          const newArray = currentComponent.state.roomData.slice(); // Create a copy of the array in state
          var loopData = ''
          var i;
          // Loop through each object that is in JSON
          console.log(res.length)
          for (i = 0; i < res.length; i++)
          {
              let obj2 = {
                  label: res[i].room_id,
                  value: res[i].roomNumber,
                  maxOccupants: res[i].maxOccupants,
              }
              newArray.push(obj2)  // Push the object
              console.log("newarray:" + newArray[0].label)
          }
          // Update the roomData Object array
          currentComponent.setState({roomData: newArray})  
      })
  }


next = () => {
    let { current, dorm, floor, buildingData, floorData, room, roomData} = this.state;
    if (current == 0) {
      if (!dorm) {
        message.error("You Must Select a Dorm!");
        return;
      }
      // User already selected the dorm
      else
      {
        var counter = 0;
        var bLoop = true;
        while(bLoop)
        {
            console.log(dorm);
            // Check if the user can select the floor
            if (buildingData[counter].value == dorm) 
            {
                var id = buildingData[counter].dormID;
                bLoop = false;                
            }
            else
            {
                counter++;    
            }
        }

        Cookies.set("buildingID", buildingData[counter].dormID)
        this.setState((preState) => {
            return {
              current: preState.current + 1,
            };
          });
      }
    }

    this.findFloorInfo();
    if (current == 1 || Cookies.get("buildingID") != '') {

      if (!floor) {
        message.error("You Must Select a Floor!");
        return;
      }
      this.setState((preState) => {
        return {
          current: preState.current + 1,
        };
      });
    }

    this.findRoomInfo();
    if (current == 2 || floorData.length > 0) {
        if (!room) {
          message.error("You Must Select a Room to Continue!");
          return;
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
      message.error("You Must Select a Room to Submit!");
      return;
    }
    this.setState({
      showModal: true,
    });
  };

  // 请求接口
  getData = ({ id, name }) => {
      console.log(name)
    if(name == "Dorm")
    {
        return{
            desc: `${name}: ${id} This is where the text would go for dorm...`,
        };
    }
    else if(name == "floor")
    {
        return{
            desc: `${name}: ${id} This is where the text would go for floor...`,
        };
    }
    else
    {
         return {
            desc: `${name}: ${id} This is where the text would go...`,
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