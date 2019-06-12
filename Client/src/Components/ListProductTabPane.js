import React, { Component } from "react";
import { Tab, Container, List } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "../Components/Alert";

class ListProductTabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: false,
      succeed: false,
      loading: true,
    };
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
        {this.state.error ? <Alert error mensaje="Error al crear la categoria" /> : null}
        {this.state.succeed ? <Alert mensaje="Categoria creada con exito" /> : null}
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
                </List.Item>
              );
            })}
          </List>
        )}
      </Tab.Pane>
    );
  }
}

export default ListProductTabPane;
