import React, { Component } from "react";
import { Tab, Container, List } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "./Alert";
class DeleteProductTabPane extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, succeed: false, loading: true, products: [] };
  }
  componentDidMount = () => {
    fetch("/GetAllProducts")
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data.data, loading: false });
      });
  };
  render() {
    return (
      <Tab.Pane>
        <h1>Productos</h1>
        <hr />
        {this.state.error ? <Alert error mensaje="Error al borrar el producto" /> : null}
        {this.state.succeed ? <Alert mensaje="Producto borrado con exito" /> : null}
        {this.state.loading ? (
          <Container textAlign="center">
            <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.loading} />
          </Container>
        ) : (
          <List>
            {this.state.products.map(prod => {
              return (
                <List.Item>
                  <List.Icon name="shopping bag" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>{prod.nombre}</List.Header>
                    <List.Description>Cuesta L. {prod.precio.toFixed(2)}</List.Description>
                  </List.Content>
                  <List.Icon
                    id="deleteIcon"
                    name="trash"
                    size="large"
                    onClick={() => {
                      fetch("/DeleteProduct", {
                        method: "post",
                        body: JSON.stringify({ id_producto: prod.id_producto }),
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
                          fetch("/GetAllProducts")
                            .then(response => response.json())
                            .then(data => {
                              this.setState({ products: data.data, loading: false });
                            });
                        });
                    }}
                    verticalAlign="middle"
                  />
                </List.Item>
              );
            })}
          </List>
        )}
      </Tab.Pane>
    );
  }
}

export default DeleteProductTabPane;
