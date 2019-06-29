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
      <Row>
        <NotificationSystem ref="notificationSystem" style={style} />
        <Col md={12}>
          <Card title="wenas" content={<p>wenas</p>} />
        </Col>
      </Row>
    );
  }
}

export default Eliminar;
