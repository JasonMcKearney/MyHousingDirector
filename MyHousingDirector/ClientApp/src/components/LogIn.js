import React, { Component } from 'react';
import './LogIn.css'

export class LogIn extends Component {

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
            <div>
                {logindata.map(logindata =>
                    <tr key={logindata.ID}>
                        <td>{logindata.ID}</td>
                        <td>{logindata.username}</td>
                    </tr>
                )}


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
