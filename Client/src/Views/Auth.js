import React, { Component } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "../Components/Alert";
const CONTEXT_STATE_LOGIN = 0;
const CONTEXT_STATE_SINGUP = 1;
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: 0,
      error: false,
      succeed: false,
      loading: false,
      identidad: "",
      nombre: "",
      user: "",
      password: "",
      Luser: "",
      Lpassword: "",
    };
  }
  getContext = () => {
    switch (this.state.estado) {
      case CONTEXT_STATE_LOGIN: {
        return (
          <Container id="contentContainer">
            {this.state.error ? <Alert error mensaje="Hubo un problema al iniciar sesion" /> : null}
            {this.state.succeed ? <Alert mensaje="Sesion iniciada con exito" /> : null}
            <h1>Iniciar sesion</h1>
            <hr />
            {this.state.loading ? (
              <Container textAlign="center">
                <ClipLoader
                  sizeUnit={"px"}
                  size={150}
                  color={"#123abc"}
                  loading={this.state.loading}
                />
              </Container>
            ) : (
              <Form id="formulariologin">
                <Form.Group widths="equal">
                  <Form.Input
                    label="Usuario"
                    placeholder="usuario"
                    value={this.state.Luser}
                    onChange={event => this.setState({ Luser: event.target.value })}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    value={this.state.Lpassword}
                    onChange={event => this.setState({ Lpassword: event.target.value })}
                  />
                </Form.Group>
                <Button
                  onClick={() => {
                    this.setState({ loading: true });
                    fetch("/Auth", {
                      method: "post",
                      body: JSON.stringify({
                        user: this.state.Luser,
                        password: this.state.Lpassword,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then(response => response.json())
                      .then(data => {
                        console.log("data", data);
                        if (data.status === "OK") {
                          localStorage.setItem("jwtToken", data.token);
                          this.setState({ succeed: true, loading: false, error: false });
                        } else {
                          this.setState({ error: true, loading: false, succeed: false });
                        }
                      });
                  }}>
                  Iniciar Sesion
                </Button>
                <Button
                  onClick={() => {
                    this.setState({
                      estado: CONTEXT_STATE_SINGUP,
                      error: false,
                      loading: false,
                      succeed: false,
                    });
                  }}>
                  No tengo cuenta
                </Button>
              </Form>
            )}
          </Container>
        );
      }
      case CONTEXT_STATE_SINGUP: {
        return (
          <Container id="contentContainer">
            {this.state.error ? <Alert error mensaje="Error al crear usuario" /> : null}
            {this.state.succeed ? <Alert mensaje="Usuario creado con exito" /> : null}
            <h1>Crear cuenta</h1>
            <hr />
            {this.state.loading ? (
              <Container textAlign="center">
                <ClipLoader
                  sizeUnit={"px"}
                  size={150}
                  color={"#123abc"}
                  loading={this.state.loading}
                />
              </Container>
            ) : (
              <Form id="formulariologin">
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    label="numero de identidad"
                    patter={"([0-9]{13})"}
                    placeholder="numero de identidad"
                    value={this.state.identidad}
                    onChange={event => {
                      this.setState({ identidad: event.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    label="Nombre"
                    placeholder="Nombre"
                    value={this.state.nombre}
                    onChange={event => {
                      this.setState({ nombre: event.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    label="Usuario"
                    placeholder="usuario"
                    value={this.state.user}
                    onChange={event => {
                      this.setState({ user: event.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    label="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChange={event => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                </Form.Group>
                <Button
                  onClick={() => {
                    this.setState({ loading: true });
                    fetch("/CreateUser", {
                      method: "post",
                      body: JSON.stringify({
                        identidad: this.state.identidad,
                        nombre: this.state.nombre,
                        user: this.state.user,
                        password: this.state.password,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then(response => response.json())
                      .then(data => {
                        if (data.status === "OK") {
                          this.setState({ succeed: true, loading: false, error: false });
                        } else {
                          this.setState({ error: true, loading: false, succeed: false });
                        }
                      });
                  }}>
                  Crear Cuenta
                </Button>
                <Button
                  onClick={() => {
                    this.setState({
                      estado: CONTEXT_STATE_LOGIN,
                      error: false,
                      loading: false,
                      succeed: false,
                    });
                  }}>
                  tengo cuenta
                </Button>
              </Form>
            )}
          </Container>
        );
      }
    }
  };
  render() {
    return (
      <Container fluid id="realContainer">
        {this.getContext()}
      </Container>
    );
  }
}

export default Auth;
