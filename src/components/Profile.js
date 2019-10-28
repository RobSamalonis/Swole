import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    const myUser = this.props.auth.user.name.split(" ");
    const currentEntries = this.props.firebase.db
      .filter(item => item.Person === myUser[0])
      .sort((a, b) => (a.Exercise > b.Exercise ? 1 : -1));
    let maxes = {};
    currentEntries.forEach(item => {
      const max = Math.max(...item.LastWeight.map(item => Number(item.Weight)));
      if (!maxes[item.Exercise]) {
        maxes[item.Exercise] = { exercise: item.Exercise, weight: max };
      }

      if (maxes[item.Exercise].weight < max) {
        maxes[item.Exercise].weight = max;
      }
    });
    this.state = { maxes };
  }

  render() {
    return (
      <div className="profile">
        {this.state.maxes && (
          <Table className="my-table" ria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Lift</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Weight (lbs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {Object.keys(this.state.maxes).map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{this.state.maxes[row].exercise}</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">
                      {this.state.maxes[row].weight}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(
  mapStateToProps,
  {}
)(Profile);

export { Profile };
