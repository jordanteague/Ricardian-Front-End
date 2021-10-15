import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import instance from "../instance.js";
import Layout from "../components/Layout";
//import Layout from "../components/Layout";
//import { Link } from "../routes";

class RicardianLLC extends Component {

  static async getInitialProps() {

    const totalSupply = parseInt(await instance.methods.totalSupply().call());

    const owners = await Promise.all(
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

    const llcs = [];

    for(var i = 0; i < totalSupply; i++) {
      llcs[i] = {"owner": owners[i], "tokenDetails": tokenDetails[i]};
    }

    console.log(llcs);

    return { totalSupply, owners, tokenDetails, llcs };

  }

  renderRows() {
    const { Row, Cell } = Table;
    const owners = this.props.owners;
    const llcs = this.props.llcs;

    return this.props.llcs.map((llc, index) => {
      return (
        <Row>
          <Cell>{index + 1}</Cell>
          <Cell>{llc["owner"]}</Cell>
          <Cell>{llc["details"]}</Cell>
          <Cell><i class="edit outline icon"></i></Cell>
        </Row>
      );
    });
  }

  render() {

    const { Header, Row, HeaderCell, Body } = Table;

    return (
        <Layout>
        <h3>LLCs</h3>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Owner</HeaderCell>
              <HeaderCell>Details</HeaderCell>
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
