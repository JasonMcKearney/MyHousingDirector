import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';

export class Home extends Component {

    state = { buttonState: false};

    render() {

        
       


        return (

            
            <div>
               
                    <h1 className = 'home-header'>Welcome to MyHousingDirector</h1>
                    <br />
                    <button className='btn-login' > Log-In</button>

            
                
         
              

           </div>
        );
    }
}





    