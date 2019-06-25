import React, { Component } from "react";
import { Container, List, Grid, Button } from "semantic-ui-react";
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
        return 0;
      });
      return reallista.map(prod => {
        return (
          <List.Item>
            <List.Icon name="shopping bag" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>{prod.nombre}</List.Header>
              <List.Description>
                Cantidad {prod.cant} Precio {prod.cant * prod.precio}
              </List.Description>
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
          <Grid columns="4" id="botonesGrid">
            <Grid.Column>
              <Button fluid>1</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>2</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>3</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>QTY</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>3</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>4</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>5</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>DESC</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>6</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>7</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>8</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid>$</Button>
            </Grid.Column>
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default Calculator;
