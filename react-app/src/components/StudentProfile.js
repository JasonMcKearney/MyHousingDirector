import React, { Component } from 'react';
import defualt_Image from '../img/defualt_Image.jpg';
import './StudentProfile.css'

export default class StudentProfile extends Component {


    render(){
        
        return(
            <div className = "grid-container">
                 <div className = "grid-item">
                    <img className = "student-image" src ={defualt_Image}></img>

                </div>

                <div className = "grid-item">
                    <h1>test</h1>
                </div>
            </div>

        );

    }

    


}
