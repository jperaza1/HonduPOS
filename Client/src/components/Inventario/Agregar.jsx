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
    this.state = { categories: [], _notificationSystem: null };
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
    this.setState({ [e.target.name]: e.target.value });
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
            id_categoria: this.state.categoriaProducto,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.status === "OK") {
              console.log("listo");
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
            console.log(data);
            if (data.status === "OK") {
              console.log("listo");
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
            console.log("data", data);
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
      default:
        break;
    }
    this.props.update();
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
                  this.handleSubmit(e, 0);
                }}>
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
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
                    },
                    {
                      label: "Nombre",
                      name: "nombreProducto",
                      type: "text",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Nombre de producto",
                    },
                    {
                      label: "Precio",
                      name: "precioProducto",
                      type: "number",
                      min: 0,
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Precio de producto",
                    },
                  ]}
                />
                <Button bsStyle="info" pullRight fill type="submit">
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
                    },
                    {
                      label: "Descripcion",
                      type: "text",
                      name: "descripcionCategoria",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Descripcion de la categoria",
                    },
                  ]}
                />
                <Button bsStyle="info" pullRight fill type="submit">
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
                      placeholder: "Nombre de la categoria",
                    },
                    {
                      label: "Otros detalles",
                      type: "text",
                      name: "otrosPayment",
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Otros detalles de el modo de pago",
                    },
                  ]}
                />
                <Button bsStyle="info" pullRight fill type="submit">
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
