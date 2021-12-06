import React, { Component } from 'react';
import { Card } from 'antd';
import "./StudentHome.css"
import Cookies from 'js-cookie';
import defaultlogo from '../img/default_logo.png'
const { Meta } = Card;

export default class DormSelection extends Component {

    constructor(props) {
        super(props);
        fetch('http://localhost:16648/api/Student/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: Cookies.get("username")
            })
        }).then((Response) => Response.json())
            .then((result) => {
                var ID = result.studentID;
                var firstName = result.firstName;
                var lastName = result.lastName;
                var email = result.email;

                Cookies.set("ID", ID);
                Cookies.set("FN", firstName);
                Cookies.set("LN", lastName);
                Cookies.set("EM", email);
            })
    }

    render() {
        return (
            <div className="StudentHomeBox">
                <div className="StudentHomeBox-left-upper">
                    <div className="Studentinfobox">
                        My Profile:
                    <Card className="Card"
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                            <p>{Cookies.get("FN")} {Cookies.get("LN")}</p>
                            <p>{Cookies.get("ID")} {Cookies.get("EM")}</p>

                        </Card>,
                        </div>
                    </div>


                <div className="StudentHomeBox-right">
                    <Card className="Roommate1"
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                        <p>{Cookies.get("FN")} {Cookies.get("LN")}</p>
                        <p>{Cookies.get("ID")} {Cookies.get("EM")}</p>

                    </Card>,<Card className="Roommate2"
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                        <p>{Cookies.get("FN")} {Cookies.get("LN")}</p>
                        <p>{Cookies.get("ID")} {Cookies.get("EM")}</p>

                    </Card>,<Card className="Roommate3"
                        hoverable
                        cover={<img alt="example" src={defaultlogo} />}
                    >
                        <p>{Cookies.get("FN")} {Cookies.get("LN")}</p>
                        <p>{Cookies.get("ID")} {Cookies.get("EM")}</p>
                    </Card>,
                </div>



            </div>



       )
    }
}
