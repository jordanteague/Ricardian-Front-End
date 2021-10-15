import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import instance from "../instance.js";
import Layout from "../components/Layout";
import { Link } from "../routes";

class RicardianLLC extends Component {

  static async getInitialProps() {

    const totalSupply = parseInt(await instance.methods.totalSupply().call());

    const ownerOf = await Promise.all(
      Array(parseInt(totalSupply))
        .fill()
        .map((element, index) => {
          return instance.methods.ownerOf(index + 1).call();
        })
    );

    const tokenDetails = await Promise.all(
      Array(parseInt(totalSupply))
        .fill()
        .map((element, index) => {
          return instance.methods.tokenDetails(index + 1).call();
        })
    );

    const tokenURI = await Promise.all(
      Array(parseInt(totalSupply))
        .fill()
        .map((element, index) => {
          return instance.methods.tokenURI(index + 1).call();
        })
    );

    const sale = await Promise.all(
      Array(parseInt(totalSupply))
        .fill()
        .map((element, index) => {
          return instance.methods.sale(index + 1).call();
        })
    );

    const llcs = [];

    for(var i = 0; i < totalSupply; i++) {
      llcs[i] = {
          "tokenId": i + 1,
          "owner": ownerOf[i],
          "tokenDetails": tokenDetails[i],
          "tokenURI": tokenURI[i],
          "buyer": sale[i]["buyer"],
          "price": sale[i]["price"]
        };
    }

    return { totalSupply, llcs };

  }

  renderRows() {
    const { Row, Cell } = Table;
    const llcs = this.props.llcs;

    return this.props.llcs.map((llc, index) => {
      return (
        <Row>
          <Cell>
            <Link route={llc["tokenURI"].toString()}>
              <a>{llc["tokenId"]}</a>
            </Link>
          </Cell>
          <Cell>{llc["owner"]}</Cell>
          <Cell>{llc["tokenDetails"]}</Cell>
          <Cell>{llc["buyer"]}</Cell>
          <Cell>{llc["price"]}</Cell>
          <Cell><Button icon="edit outline icon" /></Cell>
        </Row>
      );
    });
  }

  render() {

    const { Header, Row, HeaderCell, Body } = Table;

    return (
        <Layout>
        <h3>LLCs</h3>

        <Table style={{ overflow: 'auto', display: 'inline-block', maxHeight: 'inherit', }}>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Owner</HeaderCell>
              <HeaderCell>Details</HeaderCell>
              <HeaderCell>Pending Buyer</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>Edit</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>

        <div>Found {this.props.totalSupply} LLCs.</div>
        </Layout>
    );
  }
}

export default RicardianLLC;
