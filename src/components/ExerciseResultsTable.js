import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./ExerciseResultsTable.css";

class ExerciseResultsTable extends Component {
  constructor(props) {
    super(props);
    this.changeExercise = this.changeExercise.bind(this);
    this.state = {
      selectedExerciseIndex: 0
    };
  }

  changeExercise(event) {
    this.setState({
      selectedExerciseIndex: event.target.value
    });
  }

  getSum = () => {
    const sum = this.props.allCurrentExercises[
      this.state.selectedExerciseIndex
    ].LastWeight.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.Reps),
      0
    );

    return sum;
  };

  getTotal = () => {
    const sum = this.props.allCurrentExercises[
      this.state.selectedExerciseIndex
    ].LastWeight.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.Weight) * Number(currentValue.Reps),
      0
    );

    return sum;
  };

  render() {
    return (
      <div>
        {/* change this to date once we get data points */}
        <Select
          value={this.state.selectedExerciseIndex}
          onChange={this.changeExercise}
          style={{ backgroundColor: "white", float: "right" }}
        >
          {this.props.allCurrentExercises.map((item, i) => (
            <MenuItem key={i} value={i}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>

        <Table className="my-table" ria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Set</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Weight (lbs)</TableCell>
              <TableCell align="right">Reps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {this.props.allCurrentExercises[
              this.state.selectedExerciseIndex
            ].LastWeight.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>Set {index + 1}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{row.Weight}</TableCell>
                  <TableCell align="right">{row.Reps}</TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell>Totals</TableCell>
              <TableCell align="right">{this.getTotal()}</TableCell>
              <TableCell align="right">{this.getSum()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Set Weight</TableCell>
              <TableCell align="right">
                {(this.getTotal() / this.getSum("Reps")).toFixed(0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ExerciseResultsTable;
