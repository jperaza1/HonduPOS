import React, { Component } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
class Listar extends Component {
  constructor(props) {
    super(props);
    this.props = { AllProducts: [], AllCategories: [], AllPayments: [], AllClients: [] };
  }

  componentWillReceiveProps = props => {
    let data = props.AllClients;
    console.log(data);
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
                  {this.props.AllProducts.length > 0 ? (
                    <tr>
                      {Object.keys(this.props.AllProducts[0]).map((prop, key) => {
                        if (prop !== "id_producto" && prop !== "id_categoria") {
                          return <th key={key}>{prop.replace("_", " ")}</th>;
                        }
                        return null;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.props.AllProducts.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          if (props === "image") {
                            return (
                              <td key={keys}>
                                <img className="tableImage" src={prop[props]} />
                              </td>
                            );
                          }
                          if (props !== "id_producto" && props !== "id_categoria") {
                            return (
                              <td key={keys}>
                                {props === "precio" ? "L. " : null}
                                {props === "precio" ? prop[props].toFixed(2) : prop[props]}
                              </td>
                            );
                          }
                          return null;
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
                  {this.props.AllCategories.length > 0 ? (
                    <tr>
                      {Object.keys(this.props.AllCategories[0]).map((prop, key) => {
                        if (prop !== "id_categoria") {
                          return <th key={key}>{prop.replace("_", " ")}</th>;
                        }
                        return null;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.props.AllCategories.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          if (props !== "id_categoria") {
                            return <td key={keys}>{prop[props]}</td>;
                          }
                          return null;
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
                  {this.props.AllPayments.length > 0 ? (
                    <tr>
                      {Object.keys(this.props.AllPayments[0]).map((prop, key) => {
                        if (prop !== "num_pago") {
                          return <th key={key}>{prop.replace("_", " ")}</th>;
                        }
                        return null;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.props.AllPayments.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          if (props !== "num_pago") {
                            return <td key={keys}>{prop[props]}</td>;
                          }
                          return null;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            }
          />
          <Card
            title="Listar Clientes"
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead>
                  {this.props.AllClients.length > 0 ? (
                    <tr>
                      {Object.keys(this.props.AllClients[0]).map((prop, key) => {
                        if (prop !== "id_cliente") {
                          return <th key={key}>{prop.replace("_", " ")}</th>;
                        }
                        return null;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.props.AllClients.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          if (props === "fecha_nacimiento") {
                            return <td key={keys}>{new Date(prop[props]).toLocaleDateString()}</td>;
                          }
                          if (props !== "id_cliente") {
                            return <td key={keys}>{prop[props]}</td>;
                          }
                          return null;
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
