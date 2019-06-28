import React, { Component } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
class Listar extends Component {
  constructor(props) {
    super(props);
    this.state = { AllProducts: [], AllCategories: [], AllPayment: [] };
  }
  componentDidMount = async () => {
    await fetch("/GetAllProducts")
      .then(response => response.json())
      .then(response => this.setState({ AllProducts: response.data }));
    await fetch("/GetAllCategories")
      .then(response => response.json())
      .then(response => this.setState({ AllCategories: response.data }));
    await fetch("/GetAllPayments")
      .then(response => response.json())
      .then(response => this.setState({ AllPayment: response.data }));
  };
  render() {
    return (
      <Row>
        <Col md={12}>
          <Card
            title="Listar Productos"
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead>
                  {this.state.AllProducts.length > 0 ? (
                    <tr>
                      {Object.keys(this.state.AllProducts[0]).map((prop, key) => {
                        return <th key={key}>{prop.replace("_", " ")}</th>;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.state.AllProducts.map((prop, key) => {
                    console.log("Todo", prop, key);
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          return <td key={keys}>{prop[props]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            }
          />
          <Card
            title="Listar Categorias"
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead>
                  {this.state.AllCategories.length > 0 ? (
                    <tr>
                      {Object.keys(this.state.AllCategories[0]).map((prop, key) => {
                        return <th key={key}>{prop.replace("_", " ")}</th>;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.state.AllCategories.map((prop, key) => {
                    console.log("Todo", prop, key);
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          return <td key={keys}>{prop[props]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            }
          />
          <Card
            title="Listar Modos de pago"
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead>
                  {this.state.AllPayment.length > 0 ? (
                    <tr>
                      {Object.keys(this.state.AllPayment[0]).map((prop, key) => {
                        return <th key={key}>{prop.replace("_", " ")}</th>;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.state.AllPayment.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          return <td key={keys}>{prop[props]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            }
          />
        </Col>
      </Row>
    );
  }
}

export default Listar;
