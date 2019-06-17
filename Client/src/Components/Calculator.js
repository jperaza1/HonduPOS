import React, { Component } from "react";
import { Container, List, Grid, Icon } from "semantic-ui-react";
class Calculator extends Component {
  render() {
    return (
      <Container fluid id="calculatorContainer">
        <Container id="listaDeProductos">
          <List>
            <List.Item>
              <List.Icon name="payment" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>nombre</List.Header>
                <List.Description>Detalles</List.Description>
              </List.Content>
            </List.Item>
          </List>
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
