import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import decode from "jwt-decode";

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
    this.state = { nombre: "" };
  }
  componentDidMount() {
    if (checkAuth()) {
      const token = localStorage.getItem("jwtToken");
      let { nombre } = decode(token);
      let sepa = nombre.split(" ");
      this.setState({ nombre: sepa[0] });
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
                window.location.reload();
              }}>
              Log out
            </NavItem>
          </Nav>
        ) : null}
      </div>
    );
  }
}

export default AdminNavbarLinks;
