import React, { Component } from "react";
import { Row, Col, Grid, Table, FormControl, InputGroup } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Card } from "components/Card/Card.jsx";
import Product from "components/Product/Product.jsx";
import "../assets/css/app.css";
const ISV = 0.15;
class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredproducts: [],
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
        this.setState({ products: prods.data, filteredproducts: prods.data });
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
      return 0;
    });
    let subtotal = 0;
    readyproducts.map(prod => {
      subtotal += prod.precio * prod.cant;
      return 0;
    });
    subtotal = subtotal.toFixed(2);
    let isv = subtotal * ISV;
    isv = isv.toFixed(2);
    let total = +subtotal + +isv;
    total = total.toFixed(2);
    this.setState({ readyproducts: readyproducts, subtotal, isv, total });
  };
  searchProduct = value => {
    if (value === "") {
      this.setState({ filteredproducts: this.state.products });
    } else {
      let products = this.state.products;
      products = products.filter(p => p.nombre.toLowerCase().includes(value.toLowerCase()));
      this.setState({ filteredproducts: products });
    }
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
                    <Col md={6} className="calculatorContainer">
                      <div className="items">
                        <Table striped hover>
                          <thead>
                            {this.state.products.length > 0 ? (
                              <tr>
                                {Object.keys({ ...this.state.products[0], cant: 1 }).map(
                                  (prop, key) => {
                                    if (prop !== "id_categoria" && prop !== "stock")
                                      return <th key={key}>{prop.replace("_", " ")}</th>;
                                    return null;
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
                      <div className="dinero">
                        <p>Subtotal: {this.state.subtotal}</p>
                        <p> ISV: {this.state.isv}</p>
                        <p>Total: {this.state.total}</p>
                      </div>
                    </Col>
                    <Col md={6} className="productsContainer">
                      <Row>
                        <InputGroup className="searchInput">
                          <FormControl
                            type="text"
                            onChange={e => {
                              this.searchProduct(e.target.value);
                            }}
                            placeholder="Busqueda por nombre"
                          />
                          <InputGroup.Addon>
                            <i className="fa fa-search" />
                          </InputGroup.Addon>
                        </InputGroup>
                      </Row>
                      <div className="products">
                        <Row>
                          {this.state.filteredproducts.map(prod => {
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
                      </div>
                    </Col>
                    <Button bsStyle="primary" pullRight fill type="submit">
                      Procesar compra
                    </Button>
                    <div className="clearfix" />
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
