import React, { Component } from "react";
import PosProduct from "../Components/PosProduct";
import { Grid, Container } from "semantic-ui-react";

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
      <Container style={{ width: "100%" }}>
        <Grid style={{ margin: 0, padding: 0 }}>
          <Grid.Column width={4} style={{ margin: 0, padding: 0 }}>
            <Container text>
              <p>aqui va la calcu</p>
            </Container>
          </Grid.Column>
          <Grid.Column width={12} style={{ margin: 0, padding: 0 }}>
            <Container
              fluid
              style={{
                height: "100vh",
                overflowY: "auto",
                backgroundColor: "#ecf0f1",
              }}>
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
