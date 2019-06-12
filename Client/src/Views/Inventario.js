import React, { Component } from "react";
import { Container, Button, Icon, Tab } from "semantic-ui-react";
import "../Styles/Inventario.css";
const CONTENT_STATE_CREATE = 0;
const CONTENT_STATE_READ = 1;
const CONTENT_STATE_UPDATE = 2;
const CONTENT_STATE_DELETE = 3;
class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = { ContentState: 0 };
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
            render: () => (
              <Tab.Pane>
                <h1>Producto</h1>
                <hr />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Categoria",
            render: () => (
              <Tab.Pane>
                <h1>Categoria</h1>
                <hr />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Modo de pago",
            render: () => (
              <Tab.Pane>
                <h1>Modo de pago</h1>
                <hr />
              </Tab.Pane>
            ),
          },
        ];
        return (
          <Container>
            <h1>create</h1>
            <hr />
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
          </Container>
        );
      }
      case CONTENT_STATE_READ: {
        return (
          <Container>
            <h1>read</h1>
            <hr />
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
