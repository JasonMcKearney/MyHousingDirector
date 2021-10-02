import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import 'antd/dist/antd.css';
import React from 'react';
import { Route } from 'react-router';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LogIn } from './components/LogIn';
import { Home } from './components/Home';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <div style={{
      height: '100%'
    }}>
      <Route path='/' exact component={LogIn}  />
      <Route path='/LogIn' component={LogIn}  />  
      <Route path='/home' component={Home}  />
            
      {/* <App /> */}
    </div>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
