import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
class Product extends Component {
  render() {
    return (
      <Col md={4}>
        <Card
          product
          onClick={this.props.onClick}
          title={this.props.prod.nombre}
          stats={"L " + this.props.prod.precio.toFixed(2)}
          content={
            <img
              className="productImage"
              src={this.props.prod.image ? this.props.prod.image : "/noPic.png"}
              alt={this.props.prod.nombre}
            />
          }
        />
      </Col>
    );
  }
}

export default Product;
