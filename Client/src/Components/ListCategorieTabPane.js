import React, { Component } from "react";
import { Tab, Container, List } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";

class ListCategorieTabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      error: false,
      succeed: false,
      loading: true,
    };
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
                </List.Item>
              );
            })}
          </List>
        )}
      </Tab.Pane>
    );
  }
}

export default ListCategorieTabPane;
