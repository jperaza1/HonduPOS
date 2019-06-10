import React, { Component } from "react";
import PosProduct from "../Components/PosProduct";
import { Container, Grid } from "@material-ui/core";

class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = { productos: [] };
  }
  componentDidMount = async () => {
    fetch("/getAllProducts")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ productos: data.data });
      });
  };
  render() {
    return (
      <Grid container xs={12}>
        <Grid item xs={4}>
          <p>aqui va la calcu</p>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            backgroundColor: "lightgrey",
            overflow: "auto",
            height: "100%",
            width: "100%",
          }}>
          <Container maxWidth="lg">
            <Grid container xs={12} spacing={3}>
              {this.state.productos.map(value => {
                return <PosProduct product={value} />;
              })}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default Pos;
