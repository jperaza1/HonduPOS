import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";

class Update extends Component {
  render() {
    return (
      <Row>
        <NotificationSystem ref="notificationSystem" style={style} />
        <Col md={12}>
          <Card title="Actualizar Producto" content={<p>wenas</p>} />
        </Col>
      </Row>
    );
  }
}

export default Update;
