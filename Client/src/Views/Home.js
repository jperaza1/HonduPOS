import React, { Component } from "react";
import { Container } from "semantic-ui-react";
class Home extends Component {
  render() {
    return (
      <Container fluid className="realContainer">
        <Container className="contentContainer">
          <h1>Todos Los Productos</h1>
        </Container>
      </Container>
    );
  }
}

export default Home;
