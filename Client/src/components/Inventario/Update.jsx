import React, { Component } from "react";
import { Row, Col, Form, Grid } from "react-bootstrap";
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
      categoria: undefined,
      pago: undefined,
      producto: undefined,
      cliente: undefined,
    };
    this.props = { AllProducts: [], AllCategories: [], AllPayments: [], AllClients: [] };
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
    if (new_props.AllClients.length > 0) {
      this.setState({ cliente: new_props.AllClients[0].id_cliente });
    }
  };

  handleSubmit = (e, id) => {
    switch (id) {
      case 0:
        console.log("wenas");
        break;
      default:
        break;
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
                        <option key={keys} value={prod.id_categoria}>
                          {prod.nombre}
                        </option>
                      )),
                      bsClass: "form-control",
                      name: "producto",
                      onChange: this.handleChange,
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
                      children: this.props.AllCategories.map(prod => (
                        <option value={prod.id_categoria}>{prod.nombre}</option>
                      )),
                      bsClass: "form-control",
                      name: "categoriaProducto",
                      onChange: this.handleChange,
                      placeholder: "Categoria",
                      value: this.props.AllProducts.map(value => {
                        if (value.id_producto === this.state.producto) {
                          return value.id_categoria;
                        }
                      }),
                      required: true,
                    },
                    {
                      label: "Nombre",
                      name: "nombreProducto",
                      type: "text",
                      bsClass: "form-control",
                      onChange: this.handleChange,
                      placeholder: "Nombre de producto",
                      value: this.props.AllProducts.map(value => {
                        if (value.id_producto === this.state.producto) {
                          return value.nombre;
                        }
                      }),
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
                      value: this.props.AllProducts.map(value => {
                        if (value.id_producto === this.state.producto) {
                          return value.precio;
                        }
                      }),
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
                          this.setState({ photo: e.target.result });
                        };
                      },
                      placeholder: "Precio de producto",
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
