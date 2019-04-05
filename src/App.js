import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import Error404 from "./Views/Error404";
import Header from "./Components/Header";
import "./Styles/App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="bodybody">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route component={Error404} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
