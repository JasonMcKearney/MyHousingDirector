import React, { Component } from 'react';
import defualt_Image from '../img/defualt_Image.jpg';
import './StudentProfile.css'

export default class StudentProfile extends Component {


    render(){
        
        return(
            <div>
                 <div>
                    <img className = "student-image" src ={defualt_Image}></img>

                </div>
            </div>

        );

    }

    


}
