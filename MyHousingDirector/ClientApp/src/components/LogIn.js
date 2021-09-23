import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './LogIn.css'

export class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state={deps:[]}
    }

    // creating a variable to store user table data, 
    refreshList() {
        // Fetch method will allow to fetch data from usertable api
        fetch(process.env.REACT_APP_API + 'DBManager')
            .then(response=>response.json())
            .then(data=> {
                // "deps: data" once data availabe/found, we can update the array created above in fetch
                this.setState({ deps: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const {deps}=this.state;
        return (
            <div>             
                {deps.map(dep=>
                    <tr key={dep.ID}>
                        <td>{dep.ID}</td>
                    </tr>)}


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
