import React, { Component } from "react";
import {
  Row,
  Col,
  Grid,
  Table,
  FormControl,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Card } from "components/Card/Card.jsx";
import Product from "components/Product/Product.jsx";
import "../../assets/css/app.css";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredproducts: [],
      listProducts: [],
      listPayments: [],
      listClients: [],
      payments: [],
      subtotal: 0,
      isv: 0,
      total: 0,
      flow: 0,
      restaTotal: 0,
      cardTitle: "",
      selectedItem: undefined,
      showModal: false,
      modalContext: -1,
    };
  }
  componentDidMount = () => {
    fetch("http://localhost:3001/GetAllProducts")
      .then(resp => resp.json())
      .then(prods => {
        this.setState({ products: prods.data, filteredproducts: prods.data });
      });
    fetch("http://localhost:3001/GetAllPayments")
      .then(resp => resp.json())
      .then(prods => {
        this.setState({ payments: prods.data });
      });
  };

  render() {
    return (
      <Row>
        <Grid fluid>
          <Col md={6} className="calculatorContainer">
            <div className="items">
              <Table striped hover>
                <thead>
                  {this.state.products.length > 0 ? (
                    <tr>
                      {Object.keys({ ...this.state.products[0], cant: 1 }).map((prop, key) => {
                        if (
                          prop !== "id_categoria" &&
                          prop !== "stock" &&
                          prop !== "id_producto" &&
                          prop !== "image" &&
                          prop !== "descuento"
                        )
                          return <th key={key}>{prop.replace("_", " ")}</th>;
                        return null;
                      })}
                    </tr>
                  ) : null}
                </thead>
                <tbody>
                  {this.state.listProducts.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {Object.keys(prop).map((props, keys) => {
                          if (
                            props !== "id_categoria" &&
                            props !== "stock" &&
                            props !== "image" &&
                            props !== "id_producto" &&
                            props !== "descuento"
                          ) {
                            return (
                              <td
                                className={this.state.selectedItem === key ? "activeRow" : ""}
                                onClick={() => {
                                  this.setState({ selectedItem: key });
                                }}
                                key={keys}>
                                {prop[props]}
                              </td>
                            );
                          }
                          return null;
                        })}
                        <td className={this.state.selectedItem === key ? "activeRow" : ""}>
                          <i
                            onClick={() => {
                              let listProducts = this.state.listProducts;
                              listProducts.splice(key, 1);
                              let selectedItem = this.state.selectedItem;
                              if (selectedItem === key) {
                                selectedItem = -1;
                              }
                              this.setState({ listProducts, selectedItem });
                              this.props.prepareProducts();
                            }}
                            className="fa fa-trash"
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="powerButtons">
              <Button
                bsStyle="success"
                onClick={() => {
                  this.setState({ showModal: true, modalContext: 0 });
                }}
                fill
                style={{ flex: 1 }}>
                <i className="fa fa-money" />
                Precio
              </Button>
              <Button
                bsStyle="success"
                onClick={() => {
                  this.setState({ showModal: true, modalContext: 1 });
                }}
                fill>
                <i className="fa fa-percent" />
                Descuento
              </Button>
              <Button
                bsStyle="success"
                onClick={() => {
                  this.setState({ showModal: true, modalContext: 2 });
                }}
                fill>
                <i className="fa fa-list" />
                Cantidad
              </Button>
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
                        let listProducts = this.state.listProducts;
                        if (listProducts.includes(prod)) {
                          listProducts[listProducts.indexOf(prod)].cant =
                            listProducts[listProducts.indexOf(prod)].cant + 1;
                        } else {
                          prod.cant = 1;
                          listProducts.push(prod);
                        }
                        await this.setState({
                          listProducts,
                        });
                        this.props.prepareProducts();
                      }}
                      prod={prod}
                    />
                  );
                })}
              </Row>
            </div>
          </Col>
          <div className="navButtons">
            <Button bsStyle="primary" onClick={this.handlePurchase} pullRight fill type="submit">
              Procesar compra
            </Button>
          </div>
          <div className="clearfix" />
        </Grid>
      </Row>
    );
  }
}

export default Products;
