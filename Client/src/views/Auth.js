import React, { Component } from "react";
import { Row, Col, Grid, Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { _notificationSystem: null, redirect: false, context: 0 };
  }

  componentDidMount = async () => {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendNotification = (position, color, message, icon) => {
    var level = color; // 'success', 'warning', 'error' or 'info'
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className={icon} />,
      message: <div>{message}</div>,
      level: level,
      position: position,
      autoDismiss: 15,
    });
  };

  handleSubmit = (e, id) => {
    e.preventDefault();
    switch (id) {
      case 0: {
        fetch("http://localhost:3001/Auth", {
          method: "post",
          body: JSON.stringify({
            user: this.state.usuario,
            password: this.state.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              localStorage.setItem("jwtToken", data.token);
              this.sendNotification("tr", "success", "Autenticacion exitosa", "fa fa-check");
              this.setState({ redirect: true });
              // window.location.reload();
            } else {
              this.sendNotification("tr", "error", "Error al autenticar", "fa fa-times");
            }
          });
        break;
      }
      case 1: {
        fetch("http://localhost:3001/CreateUser", {
          method: "post",
          body: JSON.stringify({
            identidad: this.state.identidadR,
            nombre: this.state.nombreR,
            apellido: this.state.apellidoR,
            user: this.state.usuarioR,
            password: this.state.passwordR,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification("tr", "success", "Usuario creado con exito", "fa fa-check");
            } else {
              this.sendNotification("tr", "error", "Error al crear usuario", "fa fa-times");
            }
          });
        break;
      }
      default:
        break;
    }
  };

  getContext = () => {
    switch (this.state.context) {
      case 0: {
        return (
          <Form onSubmit={e => this.handleSubmit(e, 0)}>
            <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              properties={[
                {
                  label: "Usuario",
                  type: "text",
                  bsClass: "form-control",
                  name: "usuario",
                  onChange: this.handleChange,
                  placeholder: "Usuario",
                  required: true,
                },
                {
                  label: "Contraseña",
                  type: "password",
                  bsClass: "form-control",
                  name: "password",
                  onChange: this.handleChange,
                  placeholder: "Password",
                  required: true,
                },
              ]}
            />
            <Button bsStyle="info" pullRight fill type="submit">
              Iniciar Sesión
            </Button>
            <p
              className="authSubtext"
              onClick={() => {
                this.setState(state => {
                  let val = state.context === 1 ? 0 : 1;
                  return {
                    context: val,
                  };
                });
              }}>
              No tengo cuenta
            </p>
            <div className="clearfix" />
          </Form>
        );
      }
      case 1: {
        return (
          <Form onSubmit={e => this.handleSubmit(e, 1)}>
            <FormInputs
              ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
              properties={[
                {
                  label: "No. de identidad",
                  type: "text",
                  className: "form-control",
                  name: "identidadR",
                  onChange: this.handleChange,
                  placeholder: "No. de identidad Del Empleado",
                  required: true,
                  masked: true,
                  mask: [
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    "-",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    "-",
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                    /[0-9]/,
                  ],
                },
                {
                  label: "Nombre",
                  type: "text",
                  bsClass: "form-control",
                  name: "nombreR",
                  onChange: this.handleChange,
                  placeholder: "Nombre Del Empleado",
                  required: true,
                },
                {
                  label: "Apellido",
                  type: "text",
                  bsClass: "form-control",
                  name: "apellidoR",
                  onChange: this.handleChange,
                  placeholder: "Apellido Del Empleado",
                  required: true,
                },
                {
                  label: "Usuario",
                  type: "text",
                  bsClass: "form-control",
                  name: "usuarioR",
                  onChange: this.handleChange,
                  placeholder: "Usuario",
                  required: true,
                },
                {
                  label: "Contraseña",
                  type: "password",
                  bsClass: "form-control",
                  name: "passwordR",
                  onChange: this.handleChange,
                  placeholder: "Password",
                  required: true,
                },
              ]}
            />
            <Button bsStyle="info" pullRight fill type="submit">
              Crear Cuenta
            </Button>
            <p
              className="authSubtext"
              onClick={() => {
                this.setState(state => {
                  let val = state.context === 1 ? 0 : 1;
                  return {
                    context: val,
                  };
                });
              }}>
              Tengo cuenta
            </p>
            <div className="clearfix" />
          </Form>
        );
      }

      default:
        break;
    }
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <NotificationSystem ref="notificationSystem" style={style} />
          {this.state.redirect ? <Redirect to="/admin/inicio" /> : null}
          <Row>
            <Col md={12}>
              <Card
                title={this.state.context === 0 ? "Iniciar sesión" : "Registrate"}
                content={this.getContext()}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Auth;
