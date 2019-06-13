import React, { Component } from "react";
import { Container, Icon } from "semantic-ui-react";
class Error404 extends Component {
  render() {
    return (
      <Container fluid id="realContainer">
        <Container className="contentContainer" id="errorStyle">
          <div>
            <h1>Error 404</h1>
            <p>No puedo encontrar esta parte</p>
          </div>
          <Icon name="frown outline" color={"black"} size="massive" />
        </Container>
      </Container>
    );
  }
}

export default Error404;
