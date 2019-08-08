import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      categoria: {},
      pago: {},
      producto: {},
      cliente: {},
    };
    this.props = { AllProducts: [], AllCategories: [], AllPayments: [], AllClients: [] };
  }

  componentDidMount = async () => {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
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

  componentWillReceiveProps = new_props => {
    if (new_props.AllCategories.length > 0) {
      this.setState({
        categoriaId: new_props.AllCategories[0].id_categoria,
        categoria: new_props.AllCategories[0],
      });
    }
    if (new_props.AllPayments.length > 0) {
      this.setState({ pagoId: new_props.AllPayments[0].num_pago, pago: new_props.AllPayments[0] });
    }
    if (new_props.AllProducts.length > 0) {
      this.setState({
        productoId: new_props.AllProducts[0].id_producto,
        producto: new_props.AllProducts[0],
      });
    }
    if (new_props.AllClients.length > 0) {
      this.setState({
        clienteId: new_props.AllClients[0].id_cliente,
        cliente: new_props.AllClients[0],
      });
    }
  };

  handleSubmit = (e, id) => {
    switch (id) {
      case 0: {
        fetch("http://localhost:3001/updateProduct", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.producto),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification(
                "tr",
                "success",
                "Producto actualizado con exito",
                "fa fa-check"
              );
              this.props.update();
            } else {
              this.sendNotification(
                "tr",
                "error",
                "Error al actualizar el producto",
                "fa fa-times"
              );
            }
          });
        break;
      }
      case 1: {
        fetch("http://localhost:3001/updateCategorie", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.categoria),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification(
                "tr",
                "success",
                "Categoria actualizada con exito",
                "fa fa-check"
              );
              this.props.update();
            } else {
              this.sendNotification(
                "tr",
                "error",
                "Error al actualizar la categoria",
                "fa fa-times"
              );
            }
          });
        break;
      }

      case 2: {
        fetch("http://localhost:3001/updatePaymentMethod", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.pago),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification(
                "tr",
                "success",
                "Modo de pago actualizado con exito",
                "fa fa-check"
              );
              this.props.update();
            } else {
              this.sendNotification(
                "tr",
                "error",
                "Error al actualizar el modo de pago",
                "fa fa-times"
              );
            }
          });
        break;
      }

      case 3: {
        fetch("http://localhost:3001/updateClient", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.cliente),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification(
                "tr",
                "success",
                "Cliente actualizado con exito",
                "fa fa-check"
              );
              this.props.update();
            } else {
              this.sendNotification("tr", "error", "Error al actualizar el cliente", "fa fa-times");
            }
          });
        break;
      }
      default:
        break;
    }
  };
  handleChange = e => {
    switch (e.target.name) {
      case "selectedProduct": {
        this.setState({ [e.target.name]: e.target.value });
        break;
      }
      case "categoriaProducto": {
        this.setState({
          producto: { ...this.state.producto, id_categoria: parseFloat(e.target.value) },
        });
        break;
      }
      case "nombreProducto": {
        this.setState({
          producto: { ...this.state.producto, nombre: e.target.value },
        });
        break;
      }
      case "precioProducto": {
        this.setState({
          producto: { ...this.state.producto, precio: e.target.value },
        });
        break;
      }
      case "fotoProducto": {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
          this.setState({
            producto: { ...this.state.producto, image: e.target.result },
          });
        };
        break;
      }
      case "nombreCategoria": {
        this.setState({
          categoria: { ...this.state.categoria, nombre: e.target.value },
        });
        break;
      }
      case "descripcionCategoria": {
        this.setState({
          categoria: { ...this.state.categoria, descripcion: e.target.value },
        });
        break;
      }
      case "nombrePayment": {
        this.setState({
          pago: { ...this.state.pago, nombre: e.target.value },
        });
        break;
      }
      case "otrosPayment": {
        this.setState({
          pago: { ...this.state.pago, otros_detalles: e.target.value },
        });
        break;
      }
      case "nombreCliente": {
        this.setState({
          cliente: { ...this.state.cliente, nombre: e.target.value },
        });
        break;
      }
      case "apellidoCliente": {
        this.setState({
          cliente: { ...this.state.cliente, apellido: e.target.value },
        });
        break;
      }
      case "rtnCliente": {
        this.setState({
          cliente: { ...this.state.cliente, rtn: e.target.value },
        });
        break;
      }
      case "telefonoCliente": {
        this.setState({
          cliente: { ...this.state.cliente, telefono: e.target.value },
        });
        break;
      }
      default: {
        this.setState({ [e.target.name]: e.target.value });
        break;
      }
    }
  };

  render() {
    return (
      <Row>
        <NotificationSystem ref="notificationSystem" style={style} />
        <Col md={12}>
          <Card
            title="Actualizar Producto"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 0);
                }}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Producto",
                      children: this.props.AllProducts.map((prod, keys) => (
                        <option key={keys} value={keys}>
                          {prod.nombre}
                        </option>
                      )),
                      bsClass: "form-control",
                      name: "selectedProduct",
                      onChange: e => {
                        this.setState({
                          [e.target.name]: e.target.value,
                          producto: this.props.AllProducts[e.target.value],
                        });
                      },
                      placeholder: "Producto",
                    },
                  ]}
                />
                <FormInputs
                  ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Categoria",
                      children: this.props.AllCategories.map((prod, keys) => (
                        <option key={keys} value={prod.id_categoria}>
                          {prod.nombre}
                        </option>
                      )),
                      bsClass: "form-control",
                      name: "categoriaProducto",
                      onChange: this.handleChange,
                      placeholder: "Categoria",
                      value: this.state.producto.id_categoria,
                      required: true,
                    },
                    {
                      label: "Nombre",
                      name: "nombreProducto",
                      type: "text",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Nombre de producto",
                      value: this.state.producto.nombre,
                      required: true,
                    },
                    {
                      label: "Precio",
                      name: "precioProducto",
                      type: "number",
                      min: 0,
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Precio de producto",
                      value: this.state.producto.precio,
                      required: true,
                    },
                    {
                      label: "Foto",
                      name: "fotoProducto",
                      type: "file",
                      multiple: false,
                      accept: "image/*",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Precio de producto",
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Actualizar
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />

          <Card
            title="Actualizar Categoria"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 1);
                }}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Producto",
                      children: this.props.AllCategories.map((prod, keys) => (
                        <option key={keys} value={keys}>
                          {prod.nombre}
                        </option>
                      )),
                      bsClass: "form-control",
                      name: "selectedProduct",
                      onChange: e => {
                        this.setState({
                          [e.target.name]: e.target.value,
                          categoria: this.props.AllCategories[e.target.value],
                        });
                      },
                      placeholder: "Producto",
                    },
                  ]}
                />
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  properties={[
                    {
                      label: "Nombre",
                      type: "text",
                      name: "nombreCategoria",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Nombre de la categoria",
                      value: this.state.categoria.nombre,
                      required: true,
                    },
                    {
                      label: "Descripcion",
                      type: "text",
                      name: "descripcionCategoria",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Descripcion de la categoria",
                      value: this.state.categoria.descripcion,
                      required: true,
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Actualizar
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />

          <Card
            title="Actualizar Modos de pago"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 2);
                }}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Producto",
                      children: this.props.AllPayments.map((prod, keys) => (
                        <option key={keys} value={keys}>
                          {prod.nombre}
                        </option>
                      )),
                      bsClass: "form-control",
                      name: "selectedProduct",
                      onChange: e => {
                        this.setState({
                          [e.target.name]: e.target.value,
                          pago: this.props.AllPayments[e.target.value],
                        });
                      },
                      placeholder: "Producto",
                    },
                  ]}
                />
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  properties={[
                    {
                      label: "Nombre",
                      type: "text",
                      name: "nombrePayment",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Nombre del modo de pago",
                      value: this.state.pago.nombre,
                      required: true,
                    },
                    {
                      label: "Otros detalles",
                      type: "text",
                      name: "otrosPayment",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Otros detalles de el modo de pago",
                      value: this.state.pago.otros_detalles,
                      required: true,
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Actualizar
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />

          <Card
            title="Actualizar Modos de pago"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 3);
                }}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Producto",
                      children: this.props.AllClients.map((prod, keys) => (
                        <option key={keys} value={keys}>
                          {prod.rtn + " " + prod.nombre + " " + prod.apellido}
                        </option>
                      )),
                      bsClass: "form-control",
                      name: "selectedProduct",
                      onChange: e => {
                        this.setState({
                          [e.target.name]: e.target.value,
                          cliente: this.props.AllClients[e.target.value],
                        });
                      },
                      placeholder: "Producto",
                    },
                  ]}
                />
                <FormInputs
                  ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                  properties={[
                    {
                      label: "Nombre",
                      type: "text",
                      name: "nombreCliente",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Nombre del cliente",
                      value: this.state.cliente.nombre,
                      required: true,
                    },
                    {
                      label: "Apellido",
                      type: "text",
                      name: "apellidoCliente",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Apellido del cliente",
                      value: this.state.cliente.apellido,
                      required: true,
                    },
                    {
                      label: "RTN",
                      type: "text",
                      name: "rtnCliente",
                      onChange: this.handleChange,
                      className: "form-control",
                      placeholder: "RTN del cliente",
                      value: this.state.cliente.rtn,
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
                      locale: "en-CA",
                      name: "fechaCliente",
                      selected:
                        this.state.cliente.fecha_nacimiento !== undefined
                          ? new Date(this.state.cliente.fecha_nacimiento)
                          : new Date(),
                      onChange: date => {
                        this.setState({
                          cliente: { ...this.state.cliente, fecha_nacimiento: date },
                        });
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
                      name: "telefonoCliente",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Telefono del cliente",
                      value: this.state.cliente.telefono,
                      required: true,
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Actualizar
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />
        </Col>
      </Row>
    );
  }
}

export default Update;
