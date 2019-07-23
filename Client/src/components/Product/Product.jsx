import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
class Product extends Component {
  render() {
    console.log(this.props.prod.id);
    return (
      <Col md={4}>
        <Card
          onClick={this.props.onClick}
          title={this.props.prod.nombre}
          stats={"L " + this.props.prod.precio.toFixed(2)}
          content={
            <img
              className="productImage"
              src={this.props.prod.image}
              alt={this.props.prod.nombre}
            />
          }
        />
      </Col>
    );
  }
}

export default Product;
