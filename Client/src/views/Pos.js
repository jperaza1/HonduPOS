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
      flow: 0,
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
      return null;
    });
    let subtotal = 0;
    readyproducts.map(prod => {
      subtotal += prod.precio * prod.cant;
      return null;
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
  handlePurchase = () => {
    this.setState({ flow: 1, cardTitle: "Cliente" });
  };
  getState = () => {
    switch (this.state.flow) {
      case 0: {
        return (
          <Row>
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
                            prop !== "image"
                          )
                            return <th key={key}>{prop.replace("_", " ")}</th>;
                          return null;
                        })}
                      </tr>
                    ) : null}
                  </thead>
                  <tbody>
                    {this.state.readyproducts.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {Object.keys(prop).map((props, keys) => {
                            if (
                              props !== "id_categoria" &&
                              props !== "stock" &&
                              props !== "image" &&
                              props !== "id_producto"
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
            <Button
              bsStyle="primary"
              style={{ marginRight: 5 }}
              onClick={this.handlePurchase}
              pullRight
              fill
              type="submit">
              Procesar compra
            </Button>
            <div className="clearfix" />
          </Row>
        );
      }
      case 1: {
        return (
          <Row>
            <p>Informacion del pago</p>
            <Grid fluid>
              <p>Se puede continuar con esta compra?</p>
              <Button
                bsStyle="danger"
                onClick={() => {
                  this.setState({ flow: 0 });
                }}
                fill
                pullLeft>
                <i className="fa fa-arrow-left" />
                Regresar
              </Button>
              <Button
                bsStyle="success"
                onClick={() => {
                  this.setState({ showModal: true, modalContext: 3 });
                }}
                fill
                pullRight>
                <i className="fa fa-plus" />
                Agregar cliente
              </Button>
            </Grid>
            <div className="clearfix" />
          </Row>
        );
      }
      default:
        break;
    }
  };
  getModalContext = () => {
    if (this.state.selectedItem === undefined) {
      return (
        <Modal id="dialogFlex" show={this.state.showModal}>
          <ModalHeader closeButton onHide={() => this.setState({ showModal: false })}>
            Error
          </ModalHeader>
          <ModalBody>
            <p>Por favor seleccione un elemento</p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.setState({ showModal: false });
              }}
              bsStyle="success"
              fill>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
    switch (this.state.modalContext) {
      case 0:
        let nuevoPrecio = -1;
        return (
          <Modal id="dialogFlex" show={this.state.showModal}>
            <ModalHeader closeButton onHide={() => this.setState({ showModal: false })}>
              Precio
            </ModalHeader>
            <ModalBody>
              <InputGroup>
                <FormControl
                  type="text"
                  onChange={e => {
                    nuevoPrecio = parseInt(e.target.value);
                  }}
                  defaultValue={this.state.filteredproducts[this.state.selectedItem].precio}
                  placeholder="100.00"
                />
                <InputGroup.Addon>
                  <i className="fa fa-money" />
                </InputGroup.Addon>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  this.setState({ showModal: false });
                }}
                bsStyle="danger"
                fill>
                Cancelar
              </Button>
              <Button
                bsStyle="success"
                onClick={() => {
                  let filteredproducts = this.state.filteredproducts;
                  filteredproducts[this.state.selectedItem].precio = nuevoPrecio;
                  this.setState({ filteredproducts, showModal: false });
                }}
                fill>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        );
      case 1:
        let descuento = -1;
        return (
          <Modal id="dialogFlex" show={this.state.showModal}>
            <ModalHeader closeButton onHide={() => this.setState({ showModal: false })}>
              Descuento
            </ModalHeader>
            <ModalBody>
              <InputGroup>
                <FormControl
                  type="number"
                  min={0}
                  max={100}
                  onChange={e => {
                    descuento = parseFloat(e.target.value / 100);
                  }}
                  placeholder="10%"
                />
                <InputGroup.Addon>
                  <i className="fa fa-percent" />
                </InputGroup.Addon>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  this.setState({ showModal: false });
                }}
                bsStyle="danger"
                fill>
                Cancelar
              </Button>
              <Button
                bsStyle="success"
                onClick={() => {
                  let filteredproducts = this.state.filteredproducts;
                  filteredproducts[this.state.selectedItem].descuento = descuento;
                  this.setState({ filteredproducts, showModal: false });
                }}
                fill>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        );
      case 2:
        let nuevaCant = -1;
        return (
          <Modal id="dialogFlex" show={this.state.showModal}>
            <ModalHeader closeButton onHide={() => this.setState({ showModal: false })}>
              Cantidad
            </ModalHeader>
            <ModalBody>
              <InputGroup>
                <FormControl
                  type="text"
                  pattern="[0-9]s"
                  defaultValue={this.state.filteredproducts[this.state.selectedItem].cant}
                  onChange={e => {
                    nuevaCant = parseInt(e.target.value);
                  }}
                  placeholder="1"
                />
                <InputGroup.Addon>
                  <i className="fa fa-list" />
                </InputGroup.Addon>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  this.setState({ showModal: false });
                }}
                bsStyle="danger"
                fill>
                Cancelar
              </Button>
              <Button
                bsStyle="success"
                onClick={() => {
                  let filteredproducts = this.state.filteredproducts;
                  filteredproducts[this.state.selectedItem].cant = nuevaCant;
                  this.setState({ filteredproducts, showModal: false });
                }}
                fill>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        );
      case 3: {
        return (
          <Modal id="dialogFlex" show={this.state.showModal}>
            <ModalHeader closeButton onHide={() => this.setState({ showModal: false })}>
              Cantidad
            </ModalHeader>
            <ModalBody>
              <InputGroup>
                <FormControl type="text" pattern="[0-9]s" onChange={e => {}} placeholder="1" />
                <InputGroup.Addon>
                  <i className="fa fa-list" />
                </InputGroup.Addon>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  this.setState({ showModal: false });
                }}
                bsStyle="danger"
                fill>
                Cancelar
              </Button>
              <Button bsStyle="success" fill>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
      default:
        break;
    }
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          {this.getModalContext()}
          <Row>
            <Col md={12}>
              <Modal />
              <Card title={this.state.cardTitle} content={this.getState()} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Pos;
