import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import "./Records.css";

class Records extends Component {
  constructor(props) {
    super(props);

    let maxes = {};
    this.props.firebase.record.forEach(item => {
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
      <div>
        {this.state.maxes && this.props.firebase.record.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lift</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Weight (lbs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {Object.keys(this.state.maxes)
                .sort()
                .map((row, index) => {
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
        {this.props.firebase.record.length === 0 && (
          <div className="no-records">
            Add some exercises to track your progress!
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, {})(Records);

export { Records };
