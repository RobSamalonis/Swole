import React, { Component } from "react";
import { connect } from "react-redux";

import AddNewExercise from "../components/AddNewExercise";
import Chart from "../components/Chart.js";
import ExerciseResultsTable from "../components/ExerciseResultsTable";

import { initializeFirebase, fetchFirebase } from "../actions/firebase.action";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "react-tabs/style/react-tabs.css";
import "./GetLastWeightPage.css";

class GetLastWeightPage extends Component {
  constructor(props) {
    super(props);

    const exerciseList = [
      "Bench Press",
      "Deadlift - Conventional",
      "Deadlift - Sumo",
      "Overhead Press",
      "Squat"
    ];

    this.changeExercise = this.changeExercise.bind(this);

    this.state = {
      exerciseList,
      selectedExerciseName: "Bench Press",
      selectedTab: 0
    };
  }

  getUserExercises = () =>
    this.props.firebase.db.filter(
      item => item.Person.id === this.props.auth.user.id
    );

  changeExercise(event) {
    this.setState({
      selectedExerciseName: event.target.value,
      selectedTab: 0
    });
  }

  getMax = () =>
    Math.max(
      ...this.getExercises()
        .map(item => item.LastWeight)
        .flat()
        .map(item => Number(item.Weight))
    );

  handleSelect = index => {
    this.setState({
      selectedTab: index
    });
  };

  getExercises = () =>
    this.props.firebase.db
      .filter(item => item.Person.id === this.props.auth.user.id)
      .filter(item => item.Exercise === this.state.selectedExerciseName);

  render() {
    return (
      <div className="lastWeightPage">
        <div className="item">
          <FormControl>
            <InputLabel>Exercise</InputLabel>
            <Select
              value={this.state.selectedExerciseName}
              onChange={this.changeExercise}
              style={{ minWidth: 120 }}
            >
              {this.state.exerciseList.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {this.state.selectedExerciseName &&
            this.getExercises().length > 0 && (
              <span className="record">PR: {this.getMax()} lbs</span>
            )}
        </div>

        <div className="item">
          {this.state.selectedExerciseName !== "" && (
            <Tabs
              onSelect={this.handleSelect}
              selectedIndex={this.state.selectedTab}
            >
              <TabList>
                {this.getExercises().length > 0 && <Tab>Weight Chart</Tab>}
                {this.getExercises().length > 0 && <Tab>Plots</Tab>}
                <Tab>Add</Tab>
              </TabList>
              {this.getExercises().length > 0 && (
                <TabPanel>
                  <ExerciseResultsTable
                    allCurrentExercises={this.getExercises()}
                  />
                </TabPanel>
              )}
              {this.getExercises().length > 0 && (
                <TabPanel>
                  <Chart exercise={this.getExercises()} />
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

export default connect(
  mapStateToProps,
  { initializeFirebase, fetchFirebase }
)(GetLastWeightPage);

export { GetLastWeightPage };
