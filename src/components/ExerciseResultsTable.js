import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import "./ExerciseResultsTable.css";

class ExerciseResultsTable extends Component {
  constructor(props) {
    super(props);

    this.state = { edit: false };
  }

  getSum = () => {
    const sum = this.props.exercise.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.Reps),
      0
    );

    return sum;
  };

  getTotal = () => {
    const sum = this.props.exercise.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.Weight) * Number(currentValue.Reps),
      0
    );

    return sum;
  };

  render() {
    return (
      <Table className="my-table" ria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Set</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Reps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {this.props.exercise.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell>Set {index + 1}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{row.Weight} lbs</TableCell>
                <TableCell align="right">{row.Reps}</TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell rowSpan={2} />
            <TableCell>Totals</TableCell>
            <TableCell align="right">{this.getTotal()} lbs</TableCell>
            <TableCell align="right">{this.getSum()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Average Set Weight</TableCell>
            <TableCell align="right">
              {(this.getTotal() / this.getSum("Reps")).toFixed(0)} lbs
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default ExerciseResultsTable;
