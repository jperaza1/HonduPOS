import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import PosProduct from "../Components/PosProduct";
import Calculator from "../Components/Calculator";
import "../Styles/Pos.css";

class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = { productos: [] };
  }
  componentDidMount = async () => {
    fetch("/getAllProducts")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ productos: response.data });
      });
  };
  render() {
    return (
      <Container fluid>
        <Grid id="nopaddingmargin">
          <Grid.Column width={4} id="nopaddingmargin">
            <Container textAlign="center">
              <Calculator />
            </Container>
          </Grid.Column>
          <Grid.Column width={12} id="nopaddingmargin">
            <Container fluid id="productosContainer">
              <Grid>
                {this.state.productos.map(value => {
                  return <PosProduct product={value} />;
                })}
              </Grid>
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Pos;
