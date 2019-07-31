import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";

const checkAuth = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return false;
  }
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = { nombre: "", redirect: false };
  }
  componentDidMount() {
    if (checkAuth()) {
      const token = localStorage.getItem("jwtToken");
      let { nombre } = decode(token);
      this.setState({ nombre });
    }
  }
  render() {
    return (
      <div>
        {checkAuth() ? (
          <Nav pullRight>
            <NavItem disabled>Hola {this.state.nombre}</NavItem>
            <NavItem
              eventKey={3}
              onClick={() => {
                localStorage.removeItem("jwtToken");
                this.setState({ redirect: true });
              }}>
              Log out
            </NavItem>
          </Nav>
        ) : this.state.redirect ? (
          <Redirect to="/" />
        ) : null}
      </div>
    );
  }
}

export default AdminNavbarLinks;
