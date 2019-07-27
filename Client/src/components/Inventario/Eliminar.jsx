import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";

class Eliminar extends Component {
  constructor(props) {
    super(props);
    this.state = { _notificationSystem: null };
  }

  componentDidMount = async () => {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  };

  componentWillReceiveProps = new_props => {
    if (new_props.AllCategories.length > 0) {
      this.setState({ categoria: new_props.AllCategories[0].id_categoria });
    }
    console.log(this.props.AllPayments);
    if (new_props.AllPayments.length > 0) {
      this.setState({ pago: new_props.AllPayments[0].num_pago });
    }
    if (new_props.AllProducts.length > 0) {
      this.setState({ producto: new_props.AllProducts[0].id_producto });
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
        fetch("http://localhost:3001/DeleteCategorie", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_categoria: this.state.categoria,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.status === "OK") {
              console.log("listo");
              this.sendNotification(
                "tr",
                "success",
                "Categoria eliminada con exito",
                "fa fa-check"
              );
            } else {
              this.sendNotification("tr", "error", "Error al eliminar la categoria", "fa fa-times");
            }
          });
        break;
      }
      case 1: {
        console.log(this.state.producto);
        fetch("http://localhost:3001/DeleteProduct", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_producto: this.state.producto,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.status === "OK") {
              console.log("listo");
              this.sendNotification("tr", "success", "Producto eliminado con exito", "fa fa-check");
            } else {
              this.sendNotification("tr", "error", "Error al eliminar el producto", "fa fa-times");
            }
          });
        break;
      }
      case 2: {
        fetch("http://localhost:3001/DeletePaymentMethod", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            num_pago: this.state.pago,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log("data", data);
            if (data.status === "OK") {
              this.sendNotification(
                "tr",
                "success",
                "Modo de pago eliminado con exito",
                "fa fa-check"
              );
            } else {
              this.sendNotification(
                "tr",
                "error",
                "Error al eliminar el modo de pago",
                "fa fa-times"
              );
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
            title="Eliminar categorias"
            content={
              <Form
                onSubmit={e => {
                  this.handleSubmit(e, 0);
                }}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Categoria",
                      children: this.props.AllCategories.map(prod => (
                        <option value={prod.id_categoria}>{prod.nombre}</option>
                      )),
                      bsClass: "form-control",
                      name: "categoria",
                      onChange: this.handleChange,
                      placeholder: "Categoria",
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Eliminar
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />
          <Card
            title="Eliminar productos"
            content={
              <Form
                onSubmit={e => {
                  this.handleSubmit(e, 1);
                }}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Producto",
                      children: this.props.AllProducts.map(prod => (
                        <option value={prod.id_producto}>{prod.nombre}</option>
                      )),
                      bsClass: "form-control",
                      name: "producto",
                      onChange: this.handleChange,
                      placeholder: "Producto",
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Eliminar
                </Button>
                <div className="clearfix" />
              </Form>
            }
          />
          <Card
            title="Eliminar modo de pagos"
            content={
              <Form
                onSubmit={e => {
                  this.handleSubmit(e, 2);
                }}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      componentClass: "select",
                      label: "Modo",
                      children: this.props.AllPayments.map(prod => (
                        <option value={prod.num_pago}>{prod.nombre}</option>
                      )),
                      bsClass: "form-control",
                      name: "pago",
                      onChange: this.handleChange,
                      placeholder: "modo",
                    },
                  ]}
                />
                <Button bsStyle="success" pullRight fill type="submit">
                  Eliminar
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

export default Eliminar;
