import react, { Component } from 'react';
import { Steps, Button, message, Radio, Modal, Option, Select, Input, Descriptions } from 'antd';
import './DormSelection.css';

const { Step } = Steps;

const steps = [
    {
        title: 'Dorm',
        content: 'First-content',
    },
    {
        title: 'Floor',
        content: 'Second-content',
    },
    {
        title: 'Room',
        content: 'Last-content',
    },
];



export default class DormSelection extends Component {

    state = {
        current: 0,
        dorm: '',
        floor: '',
        room: '',
        dormData: [{
            label: 'dorm1',
            value: 'dorm1'
        }, {
            label: 'dorm2',
            value: 'dorm2'
        }],
        floorData: [],
        roomData: [],
        showModal: false,
    }

    next = () => {
        let { current, dorm, floor } = this.state;
        if (current == 0) {
            if (!dorm) {
                message.error('You Must Select a Dorm!')
                return;
            }


            if (dorm == 'dorm1') {

                this.setState({
                    floorData: [{
                        label: 'floor1',
                        value: 'floor1'
                    }, {
                        label: 'floor2',
                        value: 'floor2'
                    }]
                })
            }

            if (dorm == 'dorm2') {
                this.setState({
                    floorData: [{
                        label: ' floor1',
                        value: ' floor1'
                    }, {
                        label: 'floor2',
                        value: 'floor2'
                    },
                    {
                        label: 'floor3',
                        value: 'floor3'
                    },]
                })
            }
            this.setState((preState) => {
                return {
                    current: preState.current + 1
                }
            })
        }
        if (current == 1) {
            if (!floor) {
                message.error('You Must Select a floor!')
                return;
            }
            if (floor == 'floor1') {
                this.setState({
                    roomData: [{
                        label: 'room101',
                        value: '101'
                    },
                    {
                        label: 'room102',
                        value: '102'
                    },
                    {
                        label: 'room103',
                        value: '103'
                    },
                    {
                        label: 'room104',
                        value: '104'
                    }]
                })
            }

            if (floor == 'floor2') {
                this.setState({
                    roomData: [{
                        label: 'room201',
                        value: '201'
                    },
                    {
                        label: 'room202',
                        value: '202'
                    },
                    {
                        label: 'room203',
                        value: '203'
                    },
                    {
                        label: 'room204',
                        value: '204'
                    }]
                })
            }

            if (floor == 'floor1') {
                this.setState({
                    roomData: [{
                        label: 'room101',
                        value: '101'
                    },
                    {
                        label: 'room102',
                        value: '102'
                    },
                    {
                        label: 'room103',
                        value: '103'
                    },]
                })
            }

            if (floor == 'floor2') {
                this.setState({
                    roomData: [{
                        label: 'room201',
                        value: '201'
                    },
                    {
                        label: 'room202',
                        value: '202'
                    },
                    {
                        label: 'room203',
                        value: '203'
                    },]
                })
            }

            if (floor == 'floor3') {

                this.setState({
                    roomData: [{
                        label: 'room301',
                        value: '301'
                    },
                    {
                        label: 'room302',
                        value: '302'
                    },
                    {
                        label: 'room303',
                        value: '303'
                    },]
                })
            }
            this.setState((preState) => {
                return {
                    current: preState.current + 1
                }
            })
        }
    };

    prev = () => {
        this.setState((preState) => {
            return {
                current: preState.current - 1
            }
        })
    };

    done = () => {
        let { room } = this.state;
        let { showModal } = this.state;
        if (!room) {
            message.error('You Must Select a Room!')
            return;
        }
        this.setState({
            showModal: true
        })
    }

    onChange = (e, stateKey) => {
        console.log("e = ", e.target.value)
        this.setState({
            [stateKey]: e.target.value
        })
    }

    onFinish = (values) => {
        // 校验成功
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        // 校验失败
        console.log('Failed:', errorInfo);
    };

    render() {
        let { current, dorm, floor, room, dormData, floorData, roomData, showModal } = this.state;
        return (
            <div className="dormSelect">
                <Modal footer={null} title="Confirm Your infomation" visible={showModal} onOk={() => {
                }} onCancel={() => {
                    this.setState({
                        showModal: false
                    })
                }}>
                    <>
                        <Descriptions title="Room Info">
                            <Descriptions.Item label="Dorm">{dorm}</Descriptions.Item>
                            <Descriptions.Item label="Floor">{floor}</Descriptions.Item>
                            <Descriptions.Item label="Room">{room}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="User Info">
                            <Descriptions.Item label="FirstName">First Name</Descriptions.Item>
                            <Descriptions.Item label="LastName">Last Name</Descriptions.Item>
                            <Descriptions.Item label="Telephone">3123212132</Descriptions.Item>
                            <Descriptions.Item label="StudentID">12345</Descriptions.Item>
                        </Descriptions>

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
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div style={{
                    flex: 1
                }} className="steps-content">
                    {current == 0 && (
                        <div>
                                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
                                    Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
/*                            <Radio.Group onChange={(e) => {
                                this.onChange(e, 'dorm')
                            }} value={dorm}>
                                {dormData.map((v, i) => {
                                    return (
                                        <Radio key={i} value={v.value}>{v.label}</Radio>
                                    );
                                })}
                            </Radio.Group>*/
                        </div>
                    )}

                    {current == 1 && (
                        <div>
                            <Radio.Group onChange={(e) => {
                                this.onChange(e, 'floor')
                            }} value={floor}>

                                {floorData.map((v, i) => {
                                    return (
                                        <Radio key={i} value={v.value}>{v.label}</Radio>
                                    );
                                })}
                            </Radio.Group>
                        </div>
                    )}

                    {current == 2 && (
                        <div>
                            <Radio.Group onChange={(e) => {
                                this.onChange(e, 'room')
                            }} value={room}>

                                {roomData.map((v, i) => {
                                    return (
                                        <Radio key={i} value={v.value}>{v.label}</Radio>
                                    );
                                })}
                            </Radio.Group>
                        </div>
                    )}
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
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        );
    }

}
