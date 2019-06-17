import React, { Component } from "react";
import { Tab, Container, List } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "./Alert";
class DeleteCategorieTabPane extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false, succeed: false, loading: true, categories: [] };
  }
  componentDidMount = () => {
    fetch("/GetAllCategories")
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data.data, loading: false });
      });
  };
  render() {
    return (
      <Tab.Pane>
        <h1>Categorias</h1>
        <hr />
        {this.state.error ? <Alert error mensaje="Error al borrar el producto" /> : null}
        {this.state.succeed ? <Alert mensaje="Producto borrado con exito" /> : null}
        {this.state.loading ? (
          <Container textAlign="center">
            <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.loading} />
          </Container>
        ) : (
          <List>
            {this.state.categories.map(prod => {
              return (
                <List.Item>
                  <List.Icon name="tag" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>{prod.nombre}</List.Header>
                    <List.Description>{prod.descripcion}</List.Description>
                  </List.Content>
                  <List.Icon
                    id="deleteIcon"
                    name="trash"
                    size="large"
                    onClick={() => {
                      fetch("/DeleteCategorie", {
                        method: "post",
                        body: JSON.stringify({ id_categoria: prod.id_categoria }),
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
                          fetch("/GetAllCategories")
                            .then(response => response.json())
                            .then(data => {
                              this.setState({ categories: data.data, loading: false });
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

export default DeleteCategorieTabPane;
