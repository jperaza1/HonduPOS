import React, { Component } from "react";
import { Row, Col, Grid, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Product from "components/Product/Product.jsx";
import "../assets/css/app.css";
const ISV = 0.15;
class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      readyproducts: [],
      listproducts: [],
      subtotal: 0,
      isv: 0,
      total: 0,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3001/GetAllProducts")
      .then(resp => resp.json())
      .then(prods => {
        this.setState({ products: prods.data });
      });
  };

  prepareProducts = lista => {
    let readyproducts = [];
    lista.map(prod => {
      if (!prod.cant) {
        prod.cant = 1;
      }
      if (!readyproducts.includes(prod)) {
        delete prod.id_categoria;
        delete prod.stock;
        prod.cant = lista.filter(p => p === prod).length;
        readyproducts.push(prod);
      }
    });
    let subtotal = 0;
    readyproducts.map(prod => {
      subtotal += prod.precio * prod.cant;
    });
    subtotal = subtotal.toFixed(2);
    let isv = subtotal * ISV;
    isv = isv.toFixed(2);
    let total = +subtotal + +isv;
    total = total.toFixed(2);
    this.setState({ readyproducts: readyproducts, subtotal, isv, total });
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <Row>
                    <Col md={4}>
                      <div className="dinero">
                        <p>Subtotal: {this.state.subtotal}</p>
                        <p> ISV: {this.state.isv}</p>
                        <p>Total: {this.state.total}</p>
                      </div>
                      <div className="calculator">
                        <Table ctTableFullWidth ctTableResponsive>
                          <thead>
                            {this.state.products.length > 0 ? (
                              <tr>
                                {Object.keys({ ...this.state.products[0], cant: 1 }).map(
                                  (prop, key) => {
                                    if (prop !== "id_categoria" && prop !== "stock")
                                      return <th key={key}>{prop.replace("_", " ")}</th>;
                                  }
                                )}
                              </tr>
                            ) : null}
                          </thead>
                          <tbody>
                            {this.state.readyproducts.map((prop, key) => {
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
                      </div>
                    </Col>
                    <Col md={8} className="products">
                      <Row>
                        {this.state.products.map(prod => {
                          return (
                            <Product
                              onClick={async () => {
                                await this.setState({
                                  listproducts: [...this.state.listproducts, prod],
                                });
                                this.prepareProducts(this.state.listproducts);
                              }}
                              prod={prod}
                            />
                          );
                        })}
                      </Row>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Pos;
