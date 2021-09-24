import React, { Component } from 'react';
import './LogIn.css'

export class LogIn extends Component {
    displayName = LogIn.name

    constructor(props) {
        super(props);
        this.state = { logindata: [], loading: true };

        fetch('api/DBManager/CheckUserAccnt')
            .then(response => response.json())
            .then(data => {
                this.setState({ logindata: data, loading: false });
            });
    }

    static renderLoginData(logindata) {
        return (
            <tbody>
                {logindata.map(logindata =>
                    <tr key={logindata.ID}>
                        <td>{logindata.ID}</td>
                        <td>{logindata.username}</td>
                    </tr>
                )}
            </tbody>
        );
    }
                 
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : LogIn.renderLoginData(this.state.logindata);
        return (
            <div>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}

                <form className='login-box' >
                    <label className='label '>
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