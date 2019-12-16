import React, { Component } from "react";
import { connect } from "react-redux";

import AddNewExercise from "../components/AddNewExercise";
import ExerciseResultsTable from "../components/ExerciseResultsTable";

import { fetchFirebase, resetUpdates } from "../actions/firebase.action";

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
    this.getExercises = this.getExercises.bind(this);
    this.handleOpenExercise = this.handleOpenExercise.bind(this);

    this.state = {
      exerciseList: exercises,
      selectedExerciseName: null,
      selectedExercises: [],
      selectedTab: 0,
      userExercises: this.props.firebase.record,
      addExerciseOpen: false
    };
  }

  getUserExercises = () =>
    this.props.firebase.db.filter(
      item => item.Person.uid === this.props.firebase.user.uid
    );

  changeExercise = exercise => {
    this.setState({
      selectedExerciseName: exercise,
      selectedTab: 0
    });
  };

  handleSelect = index => {
    this.props.resetUpdates();
    this.setState({
      selectedTab: index
    });
  };

  getExercises = event => {
    const selectedExercises = this.state.userExercises.filter(
      item => item.Exercise === event.target.value
    );
    this.setState({
      selectedExercises,
      selectedExerciseName: event.target.value
    });
  };

  handleOpenExercise = () => {
    this.setState({ addExerciseOpen: true });
  };

  handleCloseExercise = () => {
    this.setState({ addExerciseOpen: false });
  };

  render() {
    return (
      <div className="lastWeightPage">
        <div className="item">
          <Autocomplete
            options={this.state.exerciseList}
            getOptionLabel={option => option}
            style={{
              width: 250,
              marginLeft: ".5em",
              float: "left",
              marginBottom: "1em"
            }}
            onSelect={this.getExercises}
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
        </div>

        {this.state.selectedExerciseName && !this.state.addExerciseOpen && (
          <ExerciseResultsTable
            selectedExerciseName={this.state.selectedExerciseName}
          />
        )}
        <Drawer
          anchor="top"
          open={this.state.addExerciseOpen}
          onClose={this.handleCloseExercise}
        >
          <div className="add-exercise">
            <AddNewExercise
              exercise={this.state.selectedExerciseName}
              handleClose={this.handleCloseExercise}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { fetchFirebase, resetUpdates })(
  GetLastWeightPage
);

export { GetLastWeightPage };
