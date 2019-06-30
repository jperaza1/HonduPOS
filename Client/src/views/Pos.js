import React, { Component } from "react";
import { Row, Col, Grid } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "../assets/css/app.css";
class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  componentDidMount() {
    fetch("http://localhost:3001/GetAllProducts")
      .then(resp => resp.json())
      .then(prods => {
        this.setState({ products: prods.data });
      });
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <Row>
                    <Col md={4} className="calculator">
                      <p>inicio</p>
                    </Col>
                    <Col md={8}>
                      <Row>
                        <div style={{ overflowY: "auto !important" }}>
                          {this.state.products.map(prod => {
                            return (
                              <Col md={3} style={{ height: "auto" }}>
                                <Row>
                                  <img src={"https://robohash.org/" + prod.id_producto} />
                                </Row>
                              </Col>
                            );
                          })}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Pos;
