import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
class Error404 extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Card
            title="Error404"
            content={
              <Grid fluid>
                <Row>
                  <Col sm="6">
                    <p>Lo siento no hemos encontrado la pagina que buscas</p>
                  </Col>
                  <Col sm="6">
                    <img alt="logo" src="/logo.png" />
                  </Col>
                </Row>
              </Grid>
            }
          />
        </Grid>
      </div>
    );
  }
}

export default Error404;
