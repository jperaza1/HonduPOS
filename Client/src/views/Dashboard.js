import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { totalMoney: 0,totalItems:0 };
  }
  componentDidMount = () => {
    fetch("http://localhost:3001/GetTotalSales")
    .then(resp => resp.json())
    .then(prods => {
      this.setState({ totalMoney: prods.total });
    });
    fetch("http://localhost:3001/GetTotalItemSold")
    .then(resp => resp.json())
    .then(prods => {
      this.setState({ totalItems: prods.total });
    });
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Ingresos"
                statsValue={"L. " + this.state.totalMoney.toFixed(2)}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Desde el inicio de los tiempos"
              />
            </Col>
            <Col lg={6} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-success" />}
                statsText="Productos Vendidos"
                statsValue={this.state.totalItems}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Desde el inicio de los tiempos"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
