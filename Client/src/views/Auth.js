import React, { Component } from "react";
import { Row, Col, Grid, Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = { _notificationSystem: null };
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

  handleSubmit = e => {
    e.preventDefault();
    fetch("/Auth", {
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
          window.location.reload();
        } else {
          this.sendNotification("tr", "error", "Error al autenticar", "fa fa-times");
        }
      });
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <NotificationSystem ref="notificationSystem" style={style} />
          <Row>
            <Col md={12}>
              <Card
                title="Iniciar sesión"
                content={
                  <Form onSubmit={this.handleSubmit}>
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
                        },
                        {
                          label: "Contraseña",
                          type: "password",
                          bsClass: "form-control",
                          name: "password",
                          onChange: this.handleChange,
                          placeholder: "Password",
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Crear
                    </Button>
                    <div className="clearfix" />
                  </Form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Auth;
