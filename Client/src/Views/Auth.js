import React, { Component } from "react";
import { Container, Grid, Form, Button } from "semantic-ui-react";
import "../Styles/Auth.css";
const CONTEXT_STATE_LOGIN = 0;
const CONTEXT_STATE_SINGUP = 1;
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { estado: 0 };
  }
  getContext = () => {
    switch (this.state.estado) {
      case CONTEXT_STATE_LOGIN: {
        return (
          <Container id="contentContainer">
            <h1>Iniciar sesion</h1>
            <hr />
            <Form id="formulariologin">
              <Form.Group widths="equal">
                <Form.Input label="Usuario" placeholder="usuario" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input label="Contraseña" type="password" placeholder="Contraseña" />
              </Form.Group>
              <Button>Iniciar Sesion</Button>
            </Form>
          </Container>
        );
      }
      case CONTEXT_STATE_SINGUP: {
        return (
          <Container id="contentContainer">
            <h1>Crear cuenta</h1>
            <hr />
          </Container>
        );
      }
    }
  };
  render() {
    return (
      <Container fluid id="loginContainer">
        {this.getContext()}
      </Container>
    );
  }
}

export default Auth;
