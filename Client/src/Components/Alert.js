import React, { Component } from "react";
import { Container } from "semantic-ui-react";
class Alert extends Component {
  render() {
    return (
      <Container textAlign="center" id={this.props.error ? "AlertError" : "AlertSuccess"}>
        {this.props.mensaje}
      </Container>
    );
  }
}

export default Alert;
