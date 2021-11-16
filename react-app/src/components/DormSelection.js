import react, { Component } from 'react';
import { Steps, Button, message, Radio } from 'antd';
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

export default class Nav1 extends Component {
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
        roomData: []
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
                        label: 'dorm1 floor1',
                        value: 'dorm1 floor1'
                    }, {
                        label: 'dorm1 floor2',
                        value: 'dorm1 floor2'
                    }]
                })
            }

            if (dorm == 'dorm2') {
                this.setState({
                    floorData: [{
                        label: 'dorm2 floor1',
                        value: 'dorm2 floor1'
                    }, {
                        label: 'dorm2 floor2',
                        value: 'dorm2 floor2'
                    },
                    {
                        label: 'dorm2 floor3',
                        value: 'dorm2 floor3'
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
                if (floor == 'dorm1 floor1') {
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

                if (floor == 'dorm1 floor2') {
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

                if (floor == 'dorm2 floor1') {
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

                if (floor == 'dorm2 floor2') {
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

                if (floor == 'dorm2 floor3') {
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

    onChange = (e, stateKey) => {
        console.log("e = ", e.target.value)
        this.setState({
            [stateKey]: e.target.value
        })
    }

    render() {
        let { current, dorm, floor, room, dormData, floorData, roomData } = this.state;
        return (
            <>
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
                            <Radio.Group onChange={(e) => {
                                this.onChange(e, 'dorm')
                            }} value={dorm}>
                                {dormData.map((v, i) => {
                                    return (
                                        <Radio key={i} value={v.value}>{v.label}</Radio>
                                    );
                                })}
                            </Radio.Group>
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
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </>
        );
    }

}
