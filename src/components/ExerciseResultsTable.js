import React, { Component } from "react";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

  getTotalReps = () =>
    this.props.allCurrentExercises[
      this.state.selectedExerciseIndex
    ].LastWeight.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.Reps),
      0
    );

  getTotal = () =>
    this.props.allCurrentExercises[
      this.state.selectedExerciseIndex
    ].LastWeight.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.Weight) * Number(currentValue.Reps),
      0
    );

  render() {
    return (
      <div>
        <FormControl style={{ float: "right" }}>
          <Select
            value={this.state.selectedExerciseIndex}
            onChange={this.changeExercise}
            styles={{ minWidth: 80 }}
          >
            {this.props.allCurrentExercises.map((item, i) => (
              <MenuItem key={i} value={i}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Entries</FormHelperText>
        </FormControl>
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
                  <TableCell>{index + 1}</TableCell>
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
              <TableCell align="right">{this.getTotalReps()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Set Weight</TableCell>
              <TableCell align="right">
                {(this.getTotal() / this.getTotalReps()).toFixed(0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ExerciseResultsTable;
