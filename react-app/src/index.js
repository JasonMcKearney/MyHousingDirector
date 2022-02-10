import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "antd/dist/antd.css";
import React from "react";
import { Route } from "react-router";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import LogIn from "./components/LogIn";
import { Home } from "./components/Home";
import Student from "./components/Student";
import registerServiceWorker from "./registerServiceWorker";
import { CookiesProvider } from "react-cookie";
import Search from "antd/lib/transfer/search";
import { Provider } from "react-redux";
import store from "./redux/store";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter basename={baseUrl}>
        <div
          style={{
            height: "100%",
          }}
        >
          <Route path="/" exact component={LogIn} />
          <Route path="/LogIn" component={LogIn} />
          <Route path="/home" component={Home} />
          <Route path="/student" component={Student} />

          {/* <App /> */}
        </div>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>,
  rootElement
);

registerServiceWorker();
