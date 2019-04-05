import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse } from "reactstrap";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  togglemenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    return (
      <Navbar className="heading" color="primary" expand="md" fixed="top" dark>
        <NavbarBrand href="/" style={{ color: "white", fontWeight: "bolder" }}>
          <NavLink to="/">
            <img alt="Logo" style={{ height: "fill", width: 100 }} />
          </NavLink>
        </NavbarBrand>
        <NavbarToggler className="togglerB" onClick={this.togglemenu} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                onClick={() => {
                  this.togglemodalsignup();
                }}
                className="nav-link"
                style={{ color: "white" }}
                to="#">
                Registrate
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  this.togglemodallogin();
                }}
                className="nav-link"
                style={{ color: "white" }}
                to="#">
                Iniciar Sesión
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
