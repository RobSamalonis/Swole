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
    const myUser = props.user.name.split(" ");
    let uniq = {};
    const currentEntries = props.firebase.db.filter(
      item => item.Person === myUser[0]
    );

    const arrFilteredForPerson = props.firebase.db.filter(
      item => item.Person === myUser[0]
    );

    const arrFilteredForExercise = arrFilteredForPerson.filter(
      obj => !uniq[obj.Exercise] && (uniq[obj.Exercise] = true)
    );

    arrFilteredForExercise.sort((a, b) => (a.Exercise > b.Exercise ? 1 : -1));
    this.changeExercise = this.changeExercise.bind(this);

    this.state = {
      allExercises: arrFilteredForPerson,
      currentEntries: currentEntries,
      selectedExercises: arrFilteredForExercise,
      selectedExerciseName: "",
      selectedTab: 0
    };
  }

  changeExercise(event) {
    const prevExercises = this.state.allExercises.filter(
      item => item.Exercise === event.target.value
    );
    const myExercises = this.state.selectedExercises.filter(
      item => item.Exercise === event.target.value
    );

    this.setState({
      allCurrentExercises: prevExercises,
      selectedExerciseName: myExercises[0].Exercise,
      selectedExercise: myExercises[0],
      selectedTab: 0
    });
  }

  getMax = () =>
    Math.max(
      ...this.state.currentEntries
        .filter(item => item.Exercise === this.state.selectedExerciseName)
        .map(item => item.LastWeight)
        .flat()
        .map(item => Number(item.Weight))
    );

  handleSelect = index => {
    this.setState({
      selectedTab: index
    });
  };

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
              {this.state.selectedExercises.map((item, i) => (
                <MenuItem key={i} value={item.Exercise}>
                  {item.Exercise}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {this.state.selectedExercise &&
            this.state.selectedExerciseName !== "Select an Exercise" && (
              <span className="record">
                PR: {this.getMax(this.state.selectedExercise)} lbs
              </span>
            )}
        </div>

        <div className="item">
          {this.state.selectedExercise &&
            this.state.selectedExerciseName !== "Select an Exercise" && (
              <Tabs
                onSelect={this.handleSelect}
                selectedIndex={this.state.selectedTab}
              >
                <TabList>
                  <Tab>Weight Chart</Tab>
                  <Tab>Plots</Tab>
                  <Tab>Add</Tab>
                </TabList>
                <TabPanel>
                  <ExerciseResultsTable
                    allCurrentExercises={this.state.allCurrentExercises}
                  />
                </TabPanel>
                <TabPanel>
                  {this.state.selectedExerciseName && (
                    <Chart
                      exercise={this.state.currentEntries.filter(
                        item =>
                          item.Exercise === this.state.selectedExerciseName
                      )}
                    />
                  )}
                </TabPanel>
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
