import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";

class Agregar extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], _notificationSystem: null, fechaNacimiento: "" };
  }

  componentDidMount = async () => {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  };

  componentWillReceiveProps = props => {
    if (props.AllCategories.length > 0) {
      this.setState({ categoriaProducto: props.AllCategories[0].id_categoria });
    }
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

  handleChange = e => {
    if ([e.target.name] === "fotoProducto") {
      this.setState({ [e.target.name]: this.getBase64FromImageUrl(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit = (e, id) => {
    e.preventDefault();
    switch (id) {
      case 0: {
        fetch("http://localhost:3001/CreateProduct", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: this.state.nombreProducto,
            precio: this.state.precioProducto,
            photo: this.state.fotoProducto,
            id_categoria: this.state.categoriaProducto,
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification("tr", "success", "Producto creado con exito", "fa fa-check");
            } else {
              this.sendNotification("tr", "error", "Error al crear el producto", "fa fa-times");
            }
          });
        break;
      }
      case 1: {
        fetch("http://localhost:3001/CreateCategorie", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: this.state.nombreCategoria,
            descripcion: this.state.descripcionCategoria,
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification("tr", "success", "Categoria creada con exito", "fa fa-check");
            } else {
              this.sendNotification("tr", "error", "Error al crear la categoria", "fa fa-times");
            }
          });
        break;
      }
      case 2: {
        fetch("http://localhost:3001/CreatePaymentMethod", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: this.state.nombrePayment,
            otros_detalles: this.state.otrosPayment,
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              this.sendNotification(
                "tr",
                "success",
                "Modo de pago creado con exito",
                "fa fa-check"
              );
            } else {
              this.sendNotification("tr", "error", "Error al crear el modo de pago", "fa fa-times");
            }
          });
        break;
      }
      case 3: {
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
            if (data.status === "OK") {
              this.sendNotification("tr", "success", "Cliente creado con exito", "fa fa-check");
            } else {
              this.sendNotification("tr", "error", "Error al crear el cliente", "fa fa-times");
            }
          });
        break;
      }
      default:
        break;
    }
    this.props.update();
  };
  getBase64FromImageUrl = url => {
    var img = new Image();

    img.setAttribute("crossOrigin", "anonymous");

    img.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;
  };
  render() {
    return (
      <Row>
        <NotificationSystem ref="notificationSystem" style={style} />
        <Col md={12}>
          <Card
            title="Agregar Producto"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 0);
                }}>
                <FormInputs
                  ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Categoria",
                      children: this.props.AllCategories.map(prod => (
                        <option value={prod.id_categoria}>{prod.nombre}</option>
                      )),
                      bsClass: "form-control",
                      name: "categoriaProducto",
                      onChange: this.handleChange,
                      placeholder: "Categoria",
                      required: true,
                    },
                    {
                      label: "Nombre",
                      name: "nombreProducto",
                      type: "text",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Nombre de producto",
                      required: true,
                    },
                    {
                      label: "Precio",
                      name: "precioProducto",
                      type: "number",
                      step:"0.01",
                      min: 0,
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Precio de producto",
                      required: true,
                    },
                    {
                      label: "Foto",
                      name: "fotoProducto",
                      type: "file",
                      multiple: false,
                      accept: "image/*",
                      bsClass: "form-control",
                      onChange: e => {
                        let files = e.target.files;
                        let reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = e => {
                          this.setState({ fotoProducto: e.target.result });
                        };
                      },
                      placeholder: "Precio de producto",
                      required: true,
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Crear
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />
          <Card
            title="Agregar Categoria"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 1);
                }}>
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
                      required: true,
                    },
                    {
                      label: "Descripcion",
                      type: "text",
                      name: "descripcionCategoria",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Descripcion de la categoria",
                      required: true,
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Crear
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />
          <Card
            title="Agregar Modo de pago"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 2);
                }}>
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
                      required: true,
                    },
                    {
                      label: "Otros detalles",
                      type: "text",
                      name: "otrosPayment",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Otros detalles de el modo de pago",
                      required: true,
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Crear
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />
          <Card
            title="Agregar Cliente"
            content={
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, 3);
                }}>
                <FormInputs
                  ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                  properties={[
                    {
                      label: "Nombre",
                      type: "text",
                      name: "nombreClient",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Nombre del cliente",
                      required: true,
                    },
                    {
                      label: "Apellido",
                      type: "text",
                      name: "apellidoClient",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Apellido del cliente",
                      required: true,
                    },
                    {
                      label: "RTN",
                      type: "text",
                      name: "rtnClient",
                      onChange: this.handleChange,
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
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Telefono del cliente",
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Crear
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

export default Agregar;
