import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Agregar from "components/Inventario/Agregar.jsx";
import Listar from "components/Inventario/Listar.jsx";
import Eliminar from "components/Inventario/Eliminar.jsx";
const styles = {
  tab: {
    backgroundColor: "white",
    margin: 2,
  },
};
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
    await fetch("http://localhost:3001/GetAllCliens")
      .then(response => response.json())
      .then(response => this.setState({ AllClients: response.data }));
  };
  render() {
    return (
      <div className="content">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab style={styles.tab} eventKey={1} title="Agregar">
            <Agregar update={this.getData} AllCategories={this.state.AllCategories} />
          </Tab>
          <Tab style={styles.tab} eventKey={2} title="Listar">
            <Listar
              AllProducts={this.state.AllProducts}
              AllCategories={this.state.AllCategories}
              AllPayments={this.state.AllPayments}
              AllClients={this.state.AllClients}
            />
          </Tab>
          <Tab style={styles.tab} eventKey={3} title="Eliminar">
            <Eliminar
              update={this.getData}
              AllProducts={this.state.AllProducts}
              AllCategories={this.state.AllCategories}
              AllPayments={this.state.AllPayments}
              AllClients={this.state.AllClients}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Inventario;
