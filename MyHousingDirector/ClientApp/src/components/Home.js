import React, { Component } from 'react';
import './Home.css';
import { LinkContainer } from 'react-router-bootstrap';

export class Home extends Component {

    state = { buttonState: false};

    render() {
        return (
            <div>
               
                    <h1 className = 'home-header'>Welcome to MyHousingDirector</h1>
                <br />
                <LinkContainer to={'/LogIn'}>
                    <button className='btn-login' > LogIn </button>
                </LinkContainer>
           </div>
        );
    }
}





    