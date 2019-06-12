import React, { Component } from "react";
import { Tab, Form, Container } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "./Alert";
class CreateProductTabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedcategoria: "",
      cantidad: "",
      precio: "",
      nombre: "",
      loading: false,
      error: false,
      succeed: false,
    };
  }
  componentDidMount = () => {
    fetch("/GetAllCategories")
      .then(response => response.json())
      .then(response => {
        this.setState({ categories: response.data });
      });
  };
  render() {
    return (
      <Tab.Pane>
        <Container>
          <h1>Producto</h1>
          <hr />
          {this.state.error ? <Alert error mensaje="Error al crear el producto" /> : null}
          {this.state.succeed ? <Alert mensaje="Producto creado con exito" /> : null}
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
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Nombre Del Producto"
                  placeholder="Nombre"
                  value={this.state.nombre}
                  onChange={event => {
                    this.setState({ nombre: event.target.value });
                  }}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Precio Del Producto"
                  placeholder="Precio"
                  pattern="[0-9]+"
                  value={this.state.precio}
                  onChange={event => {
                    this.setState({ precio: event.target.value });
                  }}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Cantidad Del Producto"
                  placeholder="Cantidad"
                  pattern="[0-9]+"
                  value={this.state.cantidad}
                  onChange={event => {
                    this.setState({ cantidad: event.target.value });
                  }}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Categoria</label>
                  <select
                    required
                    onChange={event => {
                      this.setState({ selectedcategoria: event.target.value });
                    }}>
                    <option value="" disabled selected>
                      Seleccione una categoria
                    </option>
                    {this.state.categories.map(cat => {
                      return <option value={cat.id_categoria}>{cat.nombre}</option>;
                    })}
                  </select>
                </Form.Field>
              </Form.Group>
              <Form.Button
                type="submit"
                onClick={() => {
                  this.setState({ loading: true });
                  fetch("/CreateProduct", {
                    method: "post",
                    body: JSON.stringify({
                      nombre: this.state.nombre,
                      precio: this.state.precio,
                      stock: this.state.cantidad,
                      id_categoria: this.state.selectedcategoria,
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
        </Container>
      </Tab.Pane>
    );
  }
}

export default CreateProductTabPane;
