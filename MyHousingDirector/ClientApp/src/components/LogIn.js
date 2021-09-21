import React, { Component } from 'react';
import './LogIn.css'


export class LogIn extends Component {


    render() {

        return (
            <div >
                <form className= 'login-box' >
                    <label className = 'label '>
                        Email:
                        
                    </label>
                    <input className='input-box' type="text" name="email" />
                    <label className='label'>
                        Password:
                       
                    </label>
                    <input className='input-box' type="password" name="password" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            );
    }
}
