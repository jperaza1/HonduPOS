import React, { Component } from "react";
import { Row, Col, Grid } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
class Pos extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="POS"
                content={
                  <div>
                    <p>inicio</p>
                  </div>
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
