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
      listproducts: [],
      payments: [],
      listpayments: [],
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
    fetch("http://localhost:3001/GetAllPayments")
      .then(resp => resp.json())
      .then(prods => {
        this.setState({ payments: prods.data });
      });
  };

  prepareProducts = () => {
    let subtotal = 0;
    this.state.listproducts.map(prod => {
      subtotal += prod.precio * prod.cant;
      return null;
    });
    subtotal = subtotal.toFixed(2);
    let isv = subtotal * ISV;
    isv = isv.toFixed(2);
    let total = +subtotal + +isv;
    total = total.toFixed(2);
    this.setState({ subtotal, isv, total });
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
    if (this.state.listproducts.length > 0) {
      this.setState({ flow: 1, cardTitle: "Pagos" });
    } else {
      this.setState({ showModal: true, errorModal: true, modalContext: 4 });
    }
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
                    {this.state.listproducts.map((prop, key) => {
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
                                let listproducts = this.state.listproducts;
                                listproducts.splice(key, 1);
                                let selectedItem = this.state.selectedItem;
                                if (selectedItem === key) {
                                  selectedItem = -1;
                                }
                                this.setState({ listproducts, selectedItem });
                                this.prepareProducts();
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
                          let listproducts = this.state.listproducts;
                          if (listproducts.includes(prod)) {
                            listproducts[listproducts.indexOf(prod)].cant =
                              listproducts[listproducts.indexOf(prod)].cant + 1;
                          } else {
                            prod.cant = 1;
                            listproducts.push(prod);
                          }
                          await this.setState({
                            listproducts,
                          });
                          this.prepareProducts();
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
        let restaTotal = 0;
        for (let i = 0; i < this.state.listpayments.length; i++) {
          let element = this.state.listpayments[i];
          restaTotal += element.pago;
        }
        return (
          <Row>
            <Grid fluid>
              <Row>
                <Col md={4}>
                  {this.state.payments.map(pay => {
                    return (
                      <Button
                        onClick={() => {
                          let listpayments = this.state.listpayments;
                          if (listpayments.length > 0) {
                            pay.total =
                              listpayments[listpayments.length - 1].total -
                              listpayments[listpayments.length - 1].pago;
                          } else {
                            pay.total = this.state.total;
                          }
                          listpayments.push(pay);
                          restaTotal = 0;
                          for (let i = 0; i < listpayments.length; i++) {
                            let element = listpayments[i];
                            restaTotal += element.pago;
                          }
                          this.setState({ listpayments });
                        }}
                        className="paymentButtons">
                        <i className="fa fa-money" /> {pay.nombre}
                      </Button>
                    );
                  })}
                </Col>
                <Col md={8}>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Se debe</th>
                        <th>A pagar</th>
                        <th>Cambio</th>
                        <th>Metodo</th>
                      </tr>
                    </thead>
                    <tbody className="tablePayments">
                      {this.state.listpayments.map((pay, key) => {
                        return (
                          <tr>
                            <td
                              className={this.state.selectedPay === key ? "activeRow" : ""}
                              onClick={() => {
                                this.setState({ selectedPay: key });
                              }}>
                              {pay.total ? parseFloat(pay.total).toFixed(2) : null}
                            </td>
                            <td
                              className={this.state.selectedPay === key ? "activeRow" : ""}
                              onClick={() => {
                                this.setState({ selectedPay: key });
                              }}>
                              <FormControl
                                type="text"
                                name={pay.nombre + key}
                                key={key}
                                defaultValue={pay.pago}
                                onChange={async e => {
                                  let listpayments = this.state.listpayments;
                                  let valor = e.target.value;
                                  listpayments[key].pago = parseFloat(valor);
                                  restaTotal = 0;
                                  for (let i = 0; i < listpayments.length; i++) {
                                    let element = listpayments[i];
                                    restaTotal += element.pago;
                                  }
                                  await this.setState({ listpayments });
                                }}
                              />
                            </td>
                            <td className={this.state.selectedPay === key ? "activeRow" : ""}>
                              {pay.pago > pay.total
                                ? Math.abs(pay.total - pay.pago).toFixed(2)
                                : 0.0}
                            </td>
                            <td
                              className={this.state.selectedPay === key ? "activeRow" : ""}
                              onClick={() => {
                                this.setState({ selectedPay: key });
                              }}>
                              {pay.nombre}
                            </td>
                            <td className={this.state.selectedPay === key ? "activeRow" : ""}>
                              <i
                                onClick={() => {
                                  let listpayments = this.state.listpayments;
                                  listpayments.splice(key, 1);
                                  let selectedPay = this.state.selectedPay;
                                  if (selectedPay === key) {
                                    selectedPay = -1;
                                  }
                                  this.setState({ listpayments, selectedPay });
                                }}
                                className="fa fa-times-circle"
                                style={{ fontSize: 24 }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                      <div id="dueMoney">
                        L.{" "}
                        {!isNaN(this.state.total - restaTotal)
                          ? (this.state.total - restaTotal).toFixed(2)
                          : (this.state.total - 0).toFixed(2)}
                      </div>
                    </tbody>
                  </Table>
                  <Button className="Cliente">
                    <i style={{ fontSize: 64 }} className="fa fa-user-plus" />
                  </Button>
                </Col>
              </Row>
              <Button
                bsStyle="danger"
                onClick={() => {
                  this.setState({ flow: 0 });
                }}
                fill>
                <i className="fa fa-arrow-left" />
                Regresar
              </Button>
              <Button
                bsStyle="success"
                onClick={() => {
                  if (this.state.total - restaTotal <= 0) {
                    this.setState({ flow: 2, cardTitle: "Cliente" });
                  } else {
                    this.setState({
                      errorModal: true,
                      showModal: true,
                      modalContext: 5,
                    });
                  }
                }}
                fill
                pullRight>
                Validar
                <i className="fa fa-arrow-right" />
              </Button>
            </Grid>
            <div className="clearfix" />
          </Row>
        );
      }
      case 2: {
        return (
          <Row>
            <Grid fluid>
              <Button
                bsStyle="danger"
                onClick={() => {
                  this.setState({ flow: 1 });
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
    if (
      this.state.selectedItem === undefined &&
      this.state.modalContext !== 4 &&
      this.state.modalContext !== 5
    ) {
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
      case 0: {
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
                  defaultValue={this.state.listproducts[this.state.selectedItem].precio}
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
                  let listproducts = this.state.listproducts;
                  listproducts[this.state.selectedItem].precio = nuevoPrecio;
                  this.setState({ listproducts, showModal: false });
                  this.prepareProducts();
                }}
                fill>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
      case 1: {
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
                  let listproducts = this.state.listproducts;
                  listproducts[this.state.selectedItem].descuento = descuento;
                  this.setState({ listproducts, showModal: false });
                  this.prepareProducts();
                }}
                fill>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
      case 2: {
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
                  defaultValue={this.state.listproducts[this.state.selectedItem].cant}
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
                  let listproducts = this.state.listproducts;
                  listproducts[this.state.selectedItem].cant = nuevaCant;
                  this.setState({ listproducts, showModal: false });
                  this.prepareProducts();
                }}
                fill>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
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
      case 4: {
        if (this.state.errorModal === true) {
          return (
            <Modal id="dialogFlex" show={this.state.errorModal}>
              <ModalHeader closeButton onHide={() => this.setState({ errorModal: false })}>
                Error
              </ModalHeader>
              <ModalBody>
                <p>No hay datos para procesar</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    this.setState({ errorModal: false });
                  }}
                  bsStyle="success"
                  fill>
                  OK
                </Button>
              </ModalFooter>
            </Modal>
          );
        } else {
          return null;
        }
      }
      case 5: {
        if (this.state.errorModal === true) {
          return (
            <Modal id="dialogFlex" show={this.state.errorModal}>
              <ModalHeader closeButton onHide={() => this.setState({ errorModal: false })}>
                Error
              </ModalHeader>
              <ModalBody>
                <p>Falta a pagar</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    this.setState({ errorModal: false });
                  }}
                  bsStyle="success"
                  fill>
                  OK
                </Button>
              </ModalFooter>
            </Modal>
          );
        } else {
          return null;
        }
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
              <Card title={this.state.cardTitle} content={this.getState()} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Pos;
