import React, { Component } from "react";
import AllProducts from "../Components/AllProducts";
class Home extends Component {
  render() {
    return (
      <div>
        <h1>Todos Los Productos</h1>
        <AllProducts />
      </div>
    );
  }
}

export default Home;
