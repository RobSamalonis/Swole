import React, { Component } from "react";
import { connect } from "react-redux";

import AddNewExercise from "../components/AddNewExercise";
import Chart from "../components/Chart.js";
import ExerciseResultsTable from "../components/ExerciseResultsTable";

import { fetchFirebase, resetUpdates } from "../actions/firebase.action";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import AddIcon from "@material-ui/icons/Add";
import Backdrop from "@material-ui/core/Backdrop";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Modal from "@material-ui/core/Modal";

import { exercises } from "./exercises.js";

import "react-tabs/style/react-tabs.css";
import "./GetLastWeightPage.css";

class GetLastWeightPage extends Component {
  constructor(props) {
    super(props);

    this.changeExercise = this.changeExercise.bind(this);
    this.getExercises = this.getExercises.bind(this);
    this.handleOpenExercise = this.handleOpenExercise.bind(this);

    const userExercises = this.props.firebase.db.filter(
      item => item.Person.uid === this.props.firebase.user.uid
    );

    this.state = {
      exerciseList: exercises,
      selectedExerciseName: null,
      selectedExercises: [],
      selectedTab: 0,
      userExercises,
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

  getMax = () =>
    Math.max(
      ...this.state.selectedExercises
        .map(item => item.LastWeight)
        .flat()
        .map(item => Number(item.Weight))
    );

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

  showButton = () => {
    console.log(
      exercises.filter(item => item === this.state.selectedExerciseName)
    );
    return (
      exercises.filter(item => item === this.state.selectedExerciseName)
        .length > 0
    );
  };

  render() {
    return (
      <div className="lastWeightPage">
        <div className="item">
          <Autocomplete
            options={this.state.exerciseList}
            getOptionLabel={option => option}
            style={{ width: 300 }}
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

          {this.state.selectedExercises.length > 0 && (
            <span className="record">Personal Record: {this.getMax()} lbs</span>
          )}
        </div>

        <div className="item">
          {this.state.selectedExerciseName && (
            <div>
              {this.state.selectedExercises.length > 0 && (
                <Tabs
                  onSelect={this.handleSelect}
                  selectedIndex={this.state.selectedTab}
                >
                  <TabList>
                    <Tab>Weight Chart</Tab>
                    <Tab>Plots</Tab>
                  </TabList>

                  <TabPanel>
                    <ExerciseResultsTable
                      allCurrentExercises={this.state.selectedExercises}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Chart exercise={this.state.selectedExercises} />
                  </TabPanel>
                </Tabs>
              )}
              <Modal
                open={this.state.addExerciseOpen}
                className="modal"
                closeAfterTransition
                onClose={this.handleCloseExercise}
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <div className="paper">
                  <AddNewExercise
                    exercise={this.state.selectedExerciseName}
                    handleClose={this.handleCloseExercise}
                  />
                </div>
              </Modal>
            </div>
          )}
        </div>
        {exercises.filter(item => item === this.state.selectedExerciseName)
          .length > 0 && (
          <Fab
            color="primary"
            aria-label="add"
            className="add-button"
            style={{ float: "right", backgroundColor: "#BB86FC" }}
            onClick={this.handleOpenExercise}
          >
            <AddIcon />
          </Fab>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { fetchFirebase, resetUpdates })(
  GetLastWeightPage
);

export { GetLastWeightPage };
