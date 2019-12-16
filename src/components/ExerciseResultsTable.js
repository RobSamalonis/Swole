import React, { Component } from "react";
import { connect } from "react-redux";

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
    let selectedExercises = [];
    selectedExercises = this.props.firebase.record.filter(
      item => item.Exercise === props.selectedExerciseName
    );

    this.state = {
      selectedExerciseIndex: 0,
      selectedExercises: selectedExercises
    };
  }

  changeExercise(event) {
    this.setState({
      selectedExerciseIndex: event.target.value
    });
  }

  getTotalReps = () =>
    this.state.selectedExercises[
      this.state.selectedExerciseIndex
    ].LastWeight.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.Reps),
      0
    );

  getTotal = () =>
    this.state.selectedExercises[
      this.state.selectedExerciseIndex
    ].LastWeight.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.Weight) * Number(currentValue.Reps),
      0
    );

  render() {
    return (
      <div>
        {this.state.selectedExercises.length > 0 && (
          <React.Fragment>
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
                {this.state.selectedExercises[
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
            <FormControl style={{ minWidth: "5em" }}>
              <Select
                value={this.state.selectedExerciseIndex}
                onChange={this.changeExercise}
              >
                {this.props.firebase.record
                  .filter(
                    item => item.Exercise === this.props.selectedExerciseName
                  )
                  .map((item, i) => (
                    <MenuItem key={i} value={i}>
                      {i + 1}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Entries</FormHelperText>
            </FormControl>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, {})(ExerciseResultsTable);

export { ExerciseResultsTable };
