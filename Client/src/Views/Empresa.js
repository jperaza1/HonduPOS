import React, { Component } from "react";
import { Container } from "semantic-ui-react";
class Empresa extends Component {
  render() {
    return (
      <Container fluid className="realContainer">
        <Container className="contentContainer">
          <h1>Perfil de la empresa</h1>
        </Container>
      </Container>
    );
  }
}

export default Empresa;
