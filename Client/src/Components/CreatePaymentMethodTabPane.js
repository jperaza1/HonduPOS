import React, { Component } from "react";
import { Tab, Form, Container } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "./Alert";
class CreatePaymentMethodTabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      descripcion: "",
      loading: false,
      error: false,
      succeed: false,
    };
  }

  render() {
    return (
      <Tab.Pane>
        <h1>Modo de pago</h1>
        <hr />
        {this.state.error ? <Alert error mensaje="Error al crear el modo de pago" /> : null}
        {this.state.succeed ? <Alert mensaje="Modo de pago creado con exito" /> : null}
        {this.state.loading ? (
          <Container textAlign="center">
            <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.loading} />
          </Container>
        ) : (
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                required
                label="Nombre"
                placeholder="Nombre"
                value={this.state.nombre}
                onChange={event => this.setState({ nombre: event.target.value })}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                required
                label="Otros Detalles"
                placeholder="Descripcion"
                value={this.state.descripcion}
                onChange={event => this.setState({ descripcion: event.target.value })}
              />
            </Form.Group>
            <Form.Button
              onClick={() => {
                this.setState({ loading: true });
                fetch("/CreatePaymentMethod", {
                  method: "post",
                  body: JSON.stringify({
                    nombre: this.state.nombre,
                    otros_detalles: this.state.descripcion,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then(response => response.json())
                  .then(data => {
                    console.log(data);
                    if (data.status === "OK") {
                      this.setState({ succeed: true, loading: false, error: false });
                    } else {
                      this.setState({ error: true, loading: false, succeed: false });
                    }
                  });
              }}>
              Crear
            </Form.Button>
          </Form>
        )}
      </Tab.Pane>
    );
  }
}

export default CreatePaymentMethodTabPane;
