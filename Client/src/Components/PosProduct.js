import React, { Component } from "react";
import { Grid, Card, CardContent, CardMedia } from "@material-ui/core";

class PosProduct extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <Grid item xs={2}>
        <div>
          <Card
            style={{
              position: "relative",
            }}>
            <CardMedia
              style={{ height: "100px", width: "100px" }}
              image={"https://robohash.org/" + this.props.product.id_producto}
              title={"Robot " + this.props.product.id_producto}
            />
            <CardContent>
              <p
                style={{
                  fontSize: "11px",
                  position: "absolute",
                  bottom: 0,
                  top: "auto",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  paddingTop: "15px",
                  padding: "3px",
                }}>
                {this.props.product.nombre}
              </p>
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  backgroundColor: "#3f51b5",
                  verticalAlign: "top",
                  color: "white",
                }}>
                L. {this.props.product.precio.toFixed(2)}
              </span>
            </CardContent>
          </Card>
        </div>
      </Grid>
    );
  }
}

export default PosProduct;
