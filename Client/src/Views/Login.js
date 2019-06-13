import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import "../Styles/Login.css";
class Login extends Component {
  render() {
    return (
      <Container fluid id="loginContainer">
        <Container id="contentContainer">
          <h1>login</h1>
          <hr />
        </Container>
      </Container>
    );
  }
}

export default Login;
