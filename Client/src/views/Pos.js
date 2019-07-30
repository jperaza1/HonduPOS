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
  Form,
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Card } from "components/Card/Card.jsx";
import Product from "components/Product/Product.jsx";
import FormInputs from "components/FormInputs/FormInputs.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import decode from "jwt-decode";
import "../assets/css/app.css";
class Pos extends Component {
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
      selectedClient: 0,
      showModal: false,
      modalContext: -1,
      empresa: {},
    };
    fetch("/Empresa.json")
      .then(res => res.json())
      .then(data => {
        this.setState({ empresa: data });
      });
  }

  dynamicSort = property => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  componentDidMount = () => {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    this.getData();
    const token = localStorage.getItem("jwtToken");
    let empleado = decode(token);
    console.log(empleado);
    this.setState({ empleado });
  };
  getData = () => {
    fetch("http://localhost:3001/GetAllProducts")
      .then(resp => resp.json())
      .then(prods => {
        prods.data.sort(this.dynamicSort("nombre"));
        this.setState({ products: prods.data, filteredproducts: prods.data });
      });
    fetch("http://localhost:3001/GetAllPayments")
      .then(resp => resp.json())
      .then(prods => {
        prods.data.sort(this.dynamicSort("nombre"));
        this.setState({ payments: prods.data });
      });
    fetch("http://localhost:3001/GetAllClients")
      .then(resp => resp.json())
      .then(prods => {
        prods.data.sort(this.dynamicSort("nombre"));
        this.setState({ listClients: prods.data });
      });
  };
  sendNotification = (position, color, message, icon) => {
    var level = color; // 'success', 'warning', 'error' or 'info'
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className={icon} />,
      message: <div>{message}</div>,
      level: level,
      position: position,
      autoDismiss: 15,
    });
  };
  prepareProducts = () => {
    let subtotal = 0;
    this.state.listProducts.map(prod => {
      subtotal += prod.precio * prod.cant;
      return null;
    });
    subtotal = parseFloat(subtotal).toFixed(2);
    let isv = subtotal * this.state.empresa.isv;
    isv = parseFloat(isv).toFixed(2);
    let total = +subtotal + +isv;
    total = parseFloat(total).toFixed(2);
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
    if (this.state.listProducts.length > 0) {
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
                                className="fa fa-times-circle"
                                style={{ color: "red", fontSize: 16 }}
                                onClick={async () => {
                                  let selectedItem = this.state.selectedItem;
                                  if (selectedItem === key) {
                                    selectedItem = -1;
                                  }
                                  console.log(key);
                                  await this.setState({
                                    listProducts: this.state.listProducts.filter(
                                      (s, _idx) => _idx !== key
                                    ),
                                    selectedItem,
                                  });
                                  this.prepareProducts();
                                }}
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
                            this.prepareProducts();
                          }}
                          prod={prod}
                        />
                      );
                    })}
                  </Row>
                </div>
              </Col>
              <div className="navButtons">
                <Button
                  bsStyle="primary"
                  id="processButton"
                  onClick={this.handlePurchase}
                  pullRight
                  fill
                  type="submit">
                  Procesar compra
                </Button>
              </div>
              <div className="clearfix" />
            </Grid>
          </Row>
        );
      }
      case 1: {
        return (
          <Row>
            <Grid fluid>
              <Row>
                <Col md={4}>
                  {this.state.payments.map(pay => {
                    return (
                      <Button
                        onClick={async () => {
                          if (this.state.listPayments.length === 0) {
                            pay.total = parseFloat(this.state.total);
                          } else {
                            pay.total =
                              this.state.listPayments[this.state.listPayments.length - 1].total -
                              this.state.listPayments[this.state.listPayments.length - 1].pago;
                          }
                          await this.setState({
                            listPayments: this.state.listPayments.concat([pay]),
                          });
                          let restaTotal = 0;
                          for (let i = 0; i < this.state.listPayments.length; i++) {
                            let element = this.state.listPayments[i];
                            restaTotal += element.pago;
                          }
                          this.setState({ restaTotal });
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
                      {this.state.listPayments.map((pay, key) => {
                        return (
                          <tr>
                            <td>{pay.total}</td>
                            <td>
                              <FormControl
                                className="form-control"
                                value={this.state.listPayments[key].pago}
                                onChangeCapture={async e => {
                                  await this.setState({
                                    listPayments: this.state.listPayments.map((p, _idx) => {
                                      if (_idx !== key) return p;
                                      return { ...p, pago: parseFloat(e.target.value) };
                                    }),
                                  });
                                  let restaTotal = 0;
                                  for (let i = 0; i < this.state.listPayments.length; i++) {
                                    let element = this.state.listPayments[i];
                                    restaTotal += element.pago;
                                  }
                                  this.setState({ restaTotal });
                                }}
                              />
                            </td>
                            <td>
                              {pay.pago > pay.total
                                ? Math.abs(pay.total - pay.pago).toFixed(2)
                                : 0.0}
                            </td>
                            <td>{pay.nombre}</td>
                            <td>
                              <i
                                className="fa fa-times-circle"
                                style={{ color: "red", fontSize: 16 }}
                                onClick={async () => {
                                  await this.setState({
                                    listPayments: this.state.listPayments.filter(
                                      (s, _idx) => _idx !== key
                                    ),
                                  });
                                  let restaTotal = 0;
                                  for (let i = 0; i < this.state.listPayments.length; i++) {
                                    let element = this.state.listPayments[i];
                                    restaTotal += element.pago;
                                  }
                                  let total = 0;
                                  if (key === 0) {
                                    total = parseFloat(this.state.total);
                                  } else {
                                    total =
                                      this.state.listPayments[key - 1].total -
                                      this.state.listPayments[key - 1].pago;
                                  }
                                  await this.setState({
                                    listPayments: this.state.listPayments.map((p, _idx) => {
                                      if (_idx !== key) return p;
                                      return { ...p, total };
                                    }),
                                    restaTotal,
                                  });
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                      <div id="dueMoney">
                        {console.log("restaTotal", this.state.restaTotal)}
                        {console.log("esto queda", this.state.total - this.state.restaTotal)}
                        L.{" "}
                        {!isNaN(this.state.total - this.state.restaTotal)
                          ? (this.state.total - this.state.restaTotal).toFixed(2)
                          : (this.state.total - 0).toFixed(2)}
                      </div>
                    </tbody>
                  </Table>
                  <Row>
                    <Col md={10}>
                      <FormControl
                        componentClass="select"
                        onChange={e => {
                          this.setState({ selectedClient: parseInt(e.target.value) });
                        }}
                        placeholder="select">
                        {this.state.listClients.map((client, key) => {
                          return (
                            <option value={key}>{client.nombre + " " + client.apellido}</option>
                          );
                        })}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button bsStyle="success" fill>
                        <i
                          className="fa fa-user-plus"
                          onClick={() => {
                            this.setState({ modalContext: 6, showModal: true, errorModal: false });
                          }}
                        />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="navButtons">
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
                    if (this.state.total - this.state.restaTotal <= 0) {
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
              </div>
            </Grid>
            <div className="clearfix" />
          </Row>
        );
      }
      case 2: {
        return (
          <Row>
            <Grid fluid>
              <div>
                <p>Nombre: {this.state.listClients[this.state.selectedClient].nombre}</p>
                <p>Apellido: {this.state.listClients[this.state.selectedClient].apellido}</p>
                <p>RTN: {this.state.listClients[this.state.selectedClient].rtn}</p>
                <p>Telefono: {this.state.listClients[this.state.selectedClient].telefono}</p>
              </div>
              <div className="navButtons">
                <Button
                  bsStyle="danger"
                  onClick={() => {
                    this.setState({ flow: 1 });
                  }}
                  fill>
                  <i className="fa fa-arrow-left" />
                  Regresar
                </Button>
                <Button
                  bsStyle="success"
                  onClick={() => {
                    fetch("http://localhost:3001/GenerateReceipt", {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        cliente: this.state.listClients[this.state.selectedClient],
                        empleado: this.state.empleado,
                        payments: this.state.listPayments,
                        products: this.state.listProducts,
                      }),
                    })
                      .then(res => res.json())
                      .then(response => {
                        if (response.status === "OK") {
                          this.sendNotification(
                            "tr",
                            "success",
                            "Factura creada con exito",
                            "fa fa-check"
                          );
                          this.setState({
                            flow: 0,
                            selectedClient: 0,
                            listPayments: [],
                            listProducts: [],
                            isv: 0,
                            total: 0,
                            subtotal: 0,
                            restaTotal: 0,
                          });
                        } else {
                          this.sendNotification(
                            "tr",
                            "error",
                            "Error al crear la factura",
                            "fa fa-times"
                          );
                        }
                      });
                  }}
                  fill
                  pullRight>
                  Finalizar
                  <i className="fa fa-check" />
                </Button>
              </div>
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
      this.state.modalContext !== 5 &&
      this.state.modalContext !== 6
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
                  defaultValue={this.state.listProducts[this.state.selectedItem].precio}
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
                  let listProducts = this.state.listProducts;
                  listProducts[this.state.selectedItem].precio = nuevoPrecio;
                  this.setState({ listProducts, showModal: false });
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
                  let listProducts = this.state.listProducts;
                  listProducts[this.state.selectedItem].descuento = descuento;
                  this.setState({ listProducts, showModal: false });
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
                  defaultValue={this.state.listProducts[this.state.selectedItem].cant}
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
                  let listProducts = this.state.listProducts;
                  listProducts[this.state.selectedItem].cant = nuevaCant;
                  this.setState({ listProducts, showModal: false });
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
                <p>No hay productos para procesar</p>
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
      case 6: {
        return (
          <Modal id="dialogFlexWide" show={this.state.showModal}>
            <ModalHeader closeButton onHide={() => this.setState({ showModal: false })}>
              Agregar Cliente
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  console.log("se envio :V");
                  fetch("http://localhost:3001/CreateClient", {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      nombre: this.state.nombreClient,
                      apellido: this.state.apellidoClient,
                      rtn: this.state.rtnClient,
                      fecha_nacimiento: this.state.fechaNacimiento,
                      telefono: this.state.telefonoClient,
                    }),
                  })
                    .then(response => response.json())
                    .then(data => {
                      console.log("data", data);
                      if (data.status === "OK") {
                        this.sendNotification(
                          "tr",
                          "success",
                          "Cliente creado con exito",
                          "fa fa-check"
                        );
                        this.getData();
                        this.setState({ showModal: false });
                      } else {
                        this.sendNotification(
                          "tr",
                          "error",
                          "Error al crear el cliente",
                          "fa fa-times"
                        );
                      }
                    });
                }}>
                <FormInputs
                  ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                  properties={[
                    {
                      label: "Nombre",
                      type: "text",
                      name: "nombreClient",
                      onChange: e => {
                        this.setState({ [e.target.name]: e.target.value });
                      },
                      bsClass: "form-control",
                      placeholder: "Nombre del cliente",
                      required: true,
                    },
                    {
                      label: "Apellido",
                      type: "text",
                      name: "apellidoClient",
                      onChange: e => {
                        this.setState({ [e.target.name]: e.target.value });
                      },
                      bsClass: "form-control",
                      placeholder: "Apellido del cliente",
                      required: true,
                    },
                    {
                      label: "RTN",
                      type: "text",
                      name: "rtnClient",
                      onChange: e => {
                        this.setState({ [e.target.name]: e.target.value });
                      },
                      className: "form-control",
                      placeholder: "RTN del cliente",
                      masked: true,
                      mask: [
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        "-",
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        "-",
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                      ],
                      required: true,
                    },
                    {
                      label: "Fecha de nacimiento",
                      type: "date",
                      date: true,
                      selected: this.state.fechaNacimiento,
                      locale: "en-CA",
                      onChange: date => {
                        console.log(new Date(date));
                        this.setState({ fechaNacimiento: date });
                      },
                      className: "form-control",
                      placeholder: "Fecha de nacimiento del cliente",
                      required: true,
                    },
                  ]}
                />
                <FormInputs
                  ncols={["col-md-3"]}
                  properties={[
                    {
                      label: "Telefono",
                      type: "text",
                      name: "telefonoClient",
                      onChange: e => {
                        this.setState({ [e.target.name]: e.target.value });
                      },
                      bsClass: "form-control",
                      placeholder: "Telefono del cliente",
                    },
                  ]}
                />
                <ModalFooter>
                  <Button bsStyle="success" type="submit" fill>
                    OK
                  </Button>
                </ModalFooter>
              </Form>
            </ModalBody>
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
        <NotificationSystem ref="notificationSystem" style={style} />
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
