import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@material-ui/core";
const styles = {
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
};

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount = async () => {
    fetch("/GetAllProducts")
      .then(response => response.json())
      .then(value => {
        console.log(value);
        this.setState({ data: value.data });
      });
  };
  render() {
    return (
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="auto">Nombre</TableCell>
              <TableCell align="auto">Precio</TableCell>
              <TableCell align="auto">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(n => (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.id_producto}
                </TableCell>
                <TableCell align="auto">{n.nombre}</TableCell>
                <TableCell align="auto">{n.precio}</TableCell>
                <TableCell align="auto">{n.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default AllProducts;
