import React, { Component } from 'react';
import defualt_Image from '../img/defualt_Image.jpg';
import './StudentProfile.css'

export default class StudentProfile extends Component {


    render() {

        return (
            <div>
                <div>
                    <img className="student-image" src={defualt_Image}></img>

                </div>
                <div className="grid-container">
                    <div className="grid-item">
                        <h1>Name:</h1>
                        <p className = "student-information">Jason McKearney</p>
                    </div>
                    <div className="grid-item">
                        <h1>test2</h1>
                    </div>
                </div>
            </div>
        );

    }




}
