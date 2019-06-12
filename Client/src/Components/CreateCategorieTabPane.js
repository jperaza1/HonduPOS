import React, { Component } from "react";
import { Tab, Form, Container } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "./Alert";
class CreateCategorieTabPane extends Component {
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
        <h1>Categoria</h1>
        <hr />
        {this.state.error ? <Alert error mensaje="Error al crear la categoria" /> : null}
        {this.state.succeed ? <Alert mensaje="Categoria creada con exito" /> : null}
        {this.state.loading ? (
          <Container textAlign="center">
            <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.loading} />
          </Container>
        ) : (
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                required
                placeholder="Nombre"
                label="Nombre"
                value={this.state.nombre}
                onChange={event => {
                  this.setState({ nombre: event.target.value });
                }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                required
                placeholder="Descripcion"
                label="Descripcion"
                value={this.state.descripcion}
                onChange={event => {
                  this.setState({ descripcion: event.target.value });
                }}
              />
            </Form.Group>
            <Form.Button
              onClick={() => {
                this.setState({ loading: true });
                fetch("/CreateCategorie", {
                  method: "post",
                  body: JSON.stringify({
                    nombre: this.state.nombre,
                    descripcion: this.state.descripcion,
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

export default CreateCategorieTabPane;
