import React, { Component } from "react";
import { Container, List, Grid, Icon } from "semantic-ui-react";
class Calculator extends Component {
  getProducts = lista => {
    {
      let reallista = [];
      lista.map(prod => {
        if (!prod.cant) {
          prod.cant = 1;
        }
        if (!reallista.includes(prod)) {
          prod.cant = lista.filter(p => p === prod).length;
          reallista.push(prod);
        }
      });
      return reallista.map(prod => {
        return (
          <List.Item>
            <List.Icon name="shopping bag" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>
                {prod.nombre} X {prod.cant}
              </List.Header>
              <List.Description> Precio {prod.cant * prod.precio}</List.Description>
            </List.Content>
          </List.Item>
        );
      });
    }
  };
  render() {
    return (
      <Container fluid id="calculatorContainer">
        <Container id="listaDeProductos">
          <List>{this.getProducts(this.props.lista)}</List>
        </Container>
        <Container fluid id="botones">
          <Grid>
            <Grid.Column width={4}>1</Grid.Column>
            <Grid.Column width={4}>2</Grid.Column>
            <Grid.Column width={4}>3</Grid.Column>
            <Grid.Column width={4}>4</Grid.Column>
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default Calculator;
