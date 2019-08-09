import React, { Component } from "react";
import { Grid, Row, Col, Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Radio from "components/CustomRadio/CustomRadio";
import Button from "components/CustomButton/CustomButton.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import ChartistGraph from "react-chartist";
import { optionsSales, responsiveOptions } from "../variables/Variables";

class Reporteria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      selectedTypeSales: "0",
      fechaVentas: new Date(),
      fechaCompras: new Date(),
      datosVentas: {},
      categoria: 0,
    };
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
  render() {
    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Ventas"
                content={
                  <Grid fluid>
                    <Row>
                      <Col md={2}>
                        <p>Tipo de Reporte</p>
                        <Form
                          onSubmit={e => {
                            e.preventDefault();
                            fetch("http://localhost:3001/GetReport", {
                              method: "post",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                type: this.state.selectedTypeSales,
                                date: this.state.fechaVentas,
                                kind: this.state.categoria,
                              }),
                            })
                              .then(resp => resp.json())
                              .then(response => {
                                this.setState({ datosVentas: response });
                              });
                          }}>
                          <Radio
                            number="0"
                            option="0"
                            name="radio"
                            onChange={e => {
                              this.setState({ selectedTypeSales: e.target.value });
                            }}
                            checked={this.state.selectedTypeSales === "0"}
                            label="Dia"
                          />
                          <Radio
                            number="1"
                            option="1"
                            name="radio"
                            onChange={e => {
                              this.setState({ selectedTypeSales: e.target.value });
                            }}
                            checked={this.state.selectedTypeSales === "1"}
                            label="Mes"
                          />
                          <Radio
                            number="2"
                            option="2"
                            name="radio"
                            onChange={e => {
                              this.setState({ selectedTypeSales: e.target.value });
                            }}
                            checked={this.state.selectedTypeSales === "2"}
                            label="Año"
                          />
                          <FormInputs
                            ncols={["col-md-12", "col-md-12"]}
                            properties={[
                              {
                                label: "Fecha para el reporte",
                                type: "date",
                                date: true,
                                selected: this.state.fechaVentas,
                                locale: "en-CA",
                                onChange: date => {
                                  this.setState({ fechaVentas: date });
                                },
                                className: "form-control",
                                placeholder: "Fecha para el reporte",
                                required: true,
                              },
                              {
                                componentClass: "select",
                                label: "Categoria",
                                children: [{ nombre: "producto" }, { nombre: "categoria" }].map(
                                  (value, idx) => {
                                    return (
                                      <option key={idx} value={idx}>
                                        {value.nombre}
                                      </option>
                                    );
                                  }
                                ),
                                bsClass: "form-control",
                                name: "selectedTypeSales",
                                onChange: e => {
                                  this.setState({ [e.target.name]: e.target.value });
                                },
                                placeholder: "Categoria",
                                required: true,
                              },
                            ]}
                          />
                          <Button bsStyle="success" pullRight fill type="submit">
                            Generar
                          </Button>
                        </Form>
                      </Col>
                      <Col md={10}>
                        <ChartistGraph
                          data={this.state.datosVentas}
                          type="Bar"
                          options={optionsSales}
                          responsiveOptions={responsiveOptions}
                        />
                      </Col>
                    </Row>
                  </Grid>
                }
              />
              <Card title="Compras" content={<p>wens</p>} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Reporteria;
