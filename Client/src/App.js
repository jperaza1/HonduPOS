import React from "react";
import { BrowserRouter, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import decode from "jwt-decode";
import Pos from "./Views/Pos";
import Error404 from "./Views/Error404";
import Home from "./Views/Home";
import Empresa from "./Views/Empresa";
import Inventario from "./Views/Inventario";
import Auth from "./Views/Auth";
import "./Styles/App.css";

const checkAuth = () => {
  const token = localStorage.getItem("jwtToken");
  console.log("token", token);
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
              pathname: "/Auth",
            }}
          />
        )
      }
    />
  );
};
const JustLoggedOutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedin: null };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div class="iconBar">
            <NavLink className="item" exact to="/">
              <Menu.Item as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
            </NavLink>
            <NavLink className="item" to="/reports">
              <Menu.Item as="a">
                <Icon name="line graph" />
                Reporteria
              </Menu.Item>
            </NavLink>
            <NavLink className="item" to="/pos">
              <Menu.Item as="a">
                <Icon name="money" />
                Ventas
              </Menu.Item>
            </NavLink>
            <NavLink className="item" to="/inventario">
              <Menu.Item as="a">
                <Icon name="edit outline" />
                Inventario
              </Menu.Item>
            </NavLink>
            <NavLink className="item" to="/empresa">
              <Menu.Item as="a">
                <Icon name="file" />
                Empresa
              </Menu.Item>
            </NavLink>
          </div>
          <div className="site-content">
            <Switch>
              <AuthRoute path="/" component={Home} exact />
              <AuthRoute path="/pos" component={Pos} />
              <AuthRoute path="/inventario" component={Inventario} />
              <AuthRoute path="/empresa" component={Empresa} />
              <JustLoggedOutRoute exact path="/Auth" component={Auth} />
              <Route component={Error404} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
