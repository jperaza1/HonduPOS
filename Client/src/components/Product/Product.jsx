import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
class Product extends Component {
  render() {
    return (
      <Col md={4} onClick={this.props.onClick}>
        <Card
          title={this.props.prod.nombre}
          stats={"L " + this.props.prod.precio.toFixed(2)}
          content={
            <img
              className="productImage"
              src={"https://robohash.org/" + this.props.prod.id_producto}
            />
          }
        />
      </Col>
    );
  }
}

export default Product;
