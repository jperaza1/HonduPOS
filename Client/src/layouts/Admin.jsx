import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import decode from "jwt-decode";

import routes from "routes.js";
import Auth from "views/Auth";
import Error404 from "views/Error404";

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

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/Auth",
            }}
          />
        )
      }
    />
  );
};

const NonAuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/inicio",
            }}
          />
        )
      }
    />
  );
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "blue",
      hasImage: false,
      fixedClasses: "dropdown show-dropdown open",
    };
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <AuthRoute
            path={prop.layout + prop.path}
            component={props => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "";
  };

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
        />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <NonAuthRoute path="/admin/Auth" component={Auth} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Admin;
