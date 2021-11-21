import React, { Component } from 'react';
import { Card } from 'antd';
import "./StudentHome.css"
import defaultlogo from '../img/default_logo.png'
const { Meta } = Card;

export default class DormSelection extends Component {
    render() {
        return (
            <div className="StudentHomeBox">
                
                    
                <div className="StudentHomeBox-left-upper">
                    <div className="Studentinfobox">
                    <Card
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                        <Meta title="FirstName LastName" description="Email Phone numebr" />
                        </Card>,
                        </div>
                    </div>

                    <div className="StudentHomeBox-left-bottom">
                        
                    </div>


                <div className="StudentHomeBox-right">

                </div>



            </div>



       )
    }
}
