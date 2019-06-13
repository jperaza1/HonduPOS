import React, { Component } from "react";
import { Redirect } from "react-router";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedin: false };
  }
  componentDidMount = () => {
    let loggedin = sessionStorage.getItem("isloggedin");
    this.setState({ loggedin: loggedin == "true" });
  };
  render() {
    return (
      <div>
        {!this.state.loggedin ? <Redirect to="/auth" /> : null}
        <h1>Todos Los Productos</h1>
      </div>
    );
  }
}

export default Home;
