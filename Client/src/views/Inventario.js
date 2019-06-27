import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }
  componentDidMount = async () => {
    fetch("/GetAllCategories")
      .then(response => response.json())
      .then(response => {
        this.setState({ categories: response.data });
      });
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Agregar Producto"
                content={
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                    }}>
                    <FormInputs
                      ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                      properties={[
                        {
                          label: "Categoria",
                          type: "select",
                          data: this.state.categories,
                          bsClass: "form-control",
                        },
                        {
                          label: "Nombre",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nombre de producto",
                        },
                        {
                          label: "Precio",
                          type: "number",
                          MinValue: "0",
                          bsClass: "form-control",
                          placeholder: "Precio de producto",
                        },
                        {
                          label: "Cantidad",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Cantidad de producto",
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Crear
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
              <Card
                title="Agregar Categoria"
                content={
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                    }}>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Nombre",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nombre de la categoria",
                        },
                        {
                          label: "Descripcion",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Descripcion de la categoria",
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Crear
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Inventario;
