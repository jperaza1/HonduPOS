import React, { Component } from "react";
import { Tab, Container, List } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import Alert from "../Components/Alert";

class ListPaymentMethodTabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      error: false,
      succeed: false,
      loading: true,
    };
  }
  componentDidMount = () => {
    fetch("/GetAllPayments")
      .then(response => response.json())
      .then(data => {
        this.setState({ payments: data.data, loading: false });
      });
  };
  render() {
    return (
      <Tab.Pane>
        <h1>Productos</h1>
        <hr />
        {this.state.error ? <Alert error mensaje="Error al crear la categoria" /> : null}
        {this.state.succeed ? <Alert mensaje="Categoria creada con exito" /> : null}
        {this.state.loading ? (
          <Container textAlign="center">
            <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.loading} />
          </Container>
        ) : (
          <List>
            {this.state.payments.map(pay => {
              return (
                <List.Item>
                  <List.Icon name="payment" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>{pay.nombre}</List.Header>
                    <List.Description>{pay.otros_detalles}</List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        )}
      </Tab.Pane>
    );
  }
}

export default ListPaymentMethodTabPane;
