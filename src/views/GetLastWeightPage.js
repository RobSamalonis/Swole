import React, { Component } from "react";
import { connect } from "react-redux";

import AddNewExercise from "../components/AddNewExercise";
import Chart from "../components/Chart.js";
import ExerciseResultsTable from "../components/ExerciseResultsTable";

import { resetUpdates, openSnack } from "../actions/firebase.action";

import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { exercises } from "./exercises.js";

import "react-tabs/style/react-tabs.css";
import "./GetLastWeightPage.css";

class GetLastWeightPage extends Component {
  constructor(props) {
    super(props);

    this.changeExercise = this.changeExercise.bind(this);
    this.handleExerciseSelect = this.handleExerciseSelect.bind(this);
    this.handleOpenExercise = this.handleOpenExercise.bind(this);

    this.state = {
      exerciseList: exercises,
      selectedExerciseName: null,
      userExercises: this.props.firebase.record,
      addExerciseOpen: false
    };
  }

  changeExercise = exercise => {
    this.setState({
      selectedExerciseName: exercise
    });
  };

  handleExerciseSelect = event => {
    this.setState({
      selectedExerciseName: event.target.value
    });
  };

  handleOpenExercise = () => {
    this.setState({ addExerciseOpen: true });
  };

  handleCloseExercise = type => {
    this.setState({ addExerciseOpen: false });
    if (type === "success") this.props.openSnack();
  };

  render() {
    return (
      <div className="lastWeightPage">
        <Autocomplete
          options={this.state.exerciseList}
          getOptionLabel={option => option}
          style={{
            width: 250,
            marginLeft: ".5em",
            float: "left",
            marginBottom: "1em"
          }}
          onSelect={this.handleExerciseSelect}
          renderInput={params => (
            <TextField
              {...params}
              label="Exercises"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {exercises.filter(item => item === this.state.selectedExerciseName)
          .length > 0 && (
          <Fab
            color="primary"
            aria-label="add"
            style={{
              float: "right",
              backgroundColor: "#BB86FC",
              marginBottom: "1em"
            }}
            onClick={this.handleOpenExercise}
          >
            <AddIcon />
          </Fab>
        )}

        {this.state.addExerciseOpen === false &&
          this.state.selectedExerciseName && (
            <React.Fragment>
              <ExerciseResultsTable
                selectedExerciseName={this.state.selectedExerciseName}
              />
              <Chart selectedExerciseName={this.state.selectedExerciseName} />
            </React.Fragment>
          )}
        <Drawer
          anchor="top"
          open={this.state.addExerciseOpen}
          onClose={this.handleCloseExercise}
        >
          <AddNewExercise
            exercise={this.state.selectedExerciseName}
            handleClose={this.handleCloseExercise}
          />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { resetUpdates, openSnack })(
  GetLastWeightPage
);

export { GetLastWeightPage };
