import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import "../Styles/Empresa.css";
class Empresa extends Component {
  render() {
    return (
      <Container fluid id="companyContainer">
        <Container id="companyDataContainer">
          <h1>wenas</h1>
          <hr />
        </Container>
      </Container>
    );
  }
}

export default Empresa;
