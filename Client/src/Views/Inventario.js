import React, { Component } from "react";
import { Container, Button, Icon, Tab } from "semantic-ui-react";
import "../Styles/Inventario.css";
import CreateProductTabPane from "../Components/CreateProductTabPane";
import CreateCategorieTabPane from "../Components/CreateCategorieTabPane";
import CreatePaymentMethodTabPane from "../Components/CreatePaymentMethodTabPane";
import ListProductTabPane from "../Components/ListProductTabPane";
import ListCategorieTabPane from "../Components/ListCategorieTabPane";
import ListPaymentMethodTabPane from "../Components/ListPaymentMethodTabPane";

const CONTENT_STATE_CREATE = 0;
const CONTENT_STATE_READ = 1;
const CONTENT_STATE_UPDATE = 2;
const CONTENT_STATE_DELETE = 3;

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContentState: 0,
    };
  }

  updateContent = id => {
    this.setState({ ContentState: id });
  };

  getContent = () => {
    switch (this.state.ContentState) {
      case CONTENT_STATE_CREATE: {
        const panes = [
          {
            menuItem: "Producto",
            render: () => <CreateProductTabPane />,
          },
          {
            menuItem: "Categoria",
            render: () => <CreateCategorieTabPane />,
          },
          {
            menuItem: "Modo de pago",
            render: () => <CreatePaymentMethodTabPane />,
          },
        ];
        return (
          <Container>
            <h1>Crear</h1>
            <hr />
            <Tab menu={{ fluid: true }} panes={panes} />
          </Container>
        );
      }
      case CONTENT_STATE_READ: {
        const panes = [
          {
            menuItem: "Productos",
            render: () => <ListProductTabPane />,
          },
          {
            menuItem: "Categorias",
            render: () => <ListCategorieTabPane />,
          },
          {
            menuItem: "Modos de pagos",
            render: () => <ListPaymentMethodTabPane />,
          },
        ];
        return (
          <Container>
            <h1>read</h1>
            <hr />
            <Tab menu={{ fluid: true }} panes={panes} />
          </Container>
        );
      }
      case CONTENT_STATE_UPDATE: {
        return (
          <Container>
            <h1>update</h1>
            <hr />
          </Container>
        );
      }
      case CONTENT_STATE_DELETE: {
        return (
          <Container>
            <h1>delete</h1>
            <hr />
          </Container>
        );
      }
      default:
        return 0;
    }
  };

  render() {
    return (
      <Container fluid id="crudContainer">
        <Button.Group id="crudHeader">
          <Button
            animated="fade"
            onClick={() => {
              this.updateContent(CONTENT_STATE_CREATE);
            }}>
            <Button.Content visible>Crear</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" />
            </Button.Content>
          </Button>
          <Button
            animated="fade"
            onClick={() => {
              this.updateContent(CONTENT_STATE_READ);
            }}>
            <Button.Content visible>Listar</Button.Content>
            <Button.Content hidden>
              <Icon name="list" />
            </Button.Content>
          </Button>
          <Button
            animated="fade"
            onClick={() => {
              this.updateContent(CONTENT_STATE_UPDATE);
            }}>
            <Button.Content visible>Actualizar</Button.Content>
            <Button.Content hidden>
              <Icon name="refresh" />
            </Button.Content>
          </Button>
          <Button
            animated="fade"
            onClick={() => {
              this.updateContent(CONTENT_STATE_DELETE);
            }}>
            <Button.Content visible>Borrar</Button.Content>
            <Button.Content hidden>
              <Icon name="minus" />
            </Button.Content>
          </Button>
        </Button.Group>
        <Container id="contentContainer">{this.getContent()}</Container>
      </Container>
    );
  }
}

export default Inventario;
