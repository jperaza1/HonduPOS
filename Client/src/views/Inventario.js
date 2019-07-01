import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Agregar from "components/Inventario/Agregar.jsx";
import Listar from "components/Inventario/Listar.jsx";
import Eliminar from "components/Inventario/Eliminar.jsx";

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = { AllProducts: [], AllCategories: [], AllPayments: [] };
  }
  componentDidMount = () => {
    this.getData();
  };
  getData = async () => {
    await fetch("http://localhost:3001/GetAllProducts")
      .then(response => response.json())
      .then(response => this.setState({ AllProducts: response.data }));
    await fetch("http://localhost:3001/GetAllCategories")
      .then(response => response.json())
      .then(response => this.setState({ AllCategories: response.data }));
    await fetch("http://localhost:3001/GetAllPayments")
      .then(response => response.json())
      .then(response => this.setState({ AllPayments: response.data }));
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Agregar update={this.getData} AllCategories={this.state.AllCategories} />
          <Listar
            AllProducts={this.state.AllProducts}
            AllCategories={this.state.AllCategories}
            AllPayments={this.state.AllPayments}
          />
          <Eliminar
            update={this.getData}
            AllProducts={this.state.AllProducts}
            AllCategories={this.state.AllCategories}
            AllPayments={this.state.AllPayments}
          />
        </Grid>
      </div>
    );
  }
}

export default Inventario;
