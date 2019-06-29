import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Agregar from "components/Inventario/Agregar";
import Listar from "components/Inventario/Listar";
import Eliminar from "components/Inventario/Eliminar";

class Inventario extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Agregar />
          <Listar />
          <Eliminar />
        </Grid>
      </div>
    );
  }
}

export default Inventario;
