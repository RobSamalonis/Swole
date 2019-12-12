import React, { Component } from "react";
import { connect } from "react-redux";

import AddNewExercise from "../components/AddNewExercise";
import Chart from "../components/Chart.js";
import ExerciseResultsTable from "../components/ExerciseResultsTable";

import { fetchFirebase } from "../actions/firebase.action";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { exercises } from "./exercises.js";

import "react-tabs/style/react-tabs.css";
import "./GetLastWeightPage.css";

class GetLastWeightPage extends Component {
  constructor(props) {
    super(props);

    this.changeExercise = this.changeExercise.bind(this);
    this.getExercisesBeta = this.getExercisesBeta.bind(this);

    const userExercises = this.props.firebase.db.filter(
      item => item.Person.uid === this.props.firebase.user.uid
    );

    this.state = {
      exerciseList: exercises,
      selectedExerciseName: null,
      selectedExercises: [],
      selectedTab: 0,
      userExercises
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
    this.setState({
      selectedTab: index
    });
  };

  getExercisesBeta = event => {
    const selectedExercises = this.state.userExercises.filter(
      item => item.Exercise === event.target.value
    );
    this.setState({
      selectedExercises,
      selectedExerciseName: event.target.value
    });
  };

  render() {
    return (
      <div className="lastWeightPage">
        <div className="item">
          <Autocomplete
            options={this.state.exerciseList}
            getOptionLabel={option => option}
            style={{ width: 300 }}
            onSelect={this.getExercisesBeta}
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
            <Tabs
              onSelect={this.handleSelect}
              selectedIndex={this.state.selectedTab}
            >
              <TabList>
                {this.state.selectedExercises.length > 0 && (
                  <Tab>Weight Chart</Tab>
                )}
                {this.state.selectedExercises.length > 0 && <Tab>Plots</Tab>}
                <Tab>Add</Tab>
              </TabList>
              {this.state.selectedExercises.length > 0 && (
                <TabPanel>
                  <ExerciseResultsTable
                    allCurrentExercises={this.state.selectedExercises}
                  />
                </TabPanel>
              )}
              {this.state.selectedExercises.length > 0 && (
                <TabPanel>
                  <Chart exercise={this.state.selectedExercises} />
                </TabPanel>
              )}
              <TabPanel>
                <AddNewExercise exercise={this.state.selectedExerciseName} />
              </TabPanel>
            </Tabs>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { fetchFirebase })(GetLastWeightPage);

export { GetLastWeightPage };
