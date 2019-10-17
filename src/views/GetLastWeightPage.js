import React, { Component } from "react";
import { connect } from "react-redux";
import ExerciseResultsTable from "../components/ExerciseResultsTable";
import { initializeFirebase, fetchFirebase } from "../actions/firebase.action";
import AddNewExercise from "../components/AddNewExercise";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chart from "../components/Chart.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
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
    const arrFiltered = props.firebase.db
      .filter(item => item.Person === myUser[0])
      .filter(obj => !uniq[obj.Exercise] && (uniq[obj.Exercise] = true));
    arrFiltered.sort((a, b) => (a.Exercise > b.Exercise ? 1 : -1));
    this.changeExercise = this.changeExercise.bind(this);
    this.state = {
      selectedPerson: myUser[0],
      exercises: [],
      currentEntries: currentEntries,
      selectedExercises: arrFiltered,
      selectedExerciseName: "Select an Exercise",
      updated: false,
      add: false,
      firebase: props.firebase,
      selectedTab: 0
    };
  }

  changeExercise(event) {
    if (event.target.value === "Select an Exercise") {
      this.setState({
        selectedExerciseName: event.target.value,
        selectedExercise: null
      });
    } else {
      const thing = this.state.selectedExercises.filter(
        item => item.Exercise === event.target.value
      );

      this.setState({
        selectedExerciseName: thing[0].Exercise,
        selectedExercise: thing[0],
        selectedTab: 0
      });
    }
  }

  getMax = () =>
    Math.max(
      ...this.state.currentEntries
        .filter(item => item.Exercise === this.state.selectedExerciseName)
        .map(item => item.LastWeight)
        .flat()
        .map(item => Number(item.Weight))
    );

  handleSelect = (index, last) => {
    this.setState({
      selectedTab: index
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.firebase && this.state.firebase.users && (
          <div className="lastWeightPage">
            <h2>Fitness Tracker</h2>
            <div className="item">
              {this.state.selectedPerson && this.state.selectedExercises && (
                <Select
                  value={this.state.selectedExerciseName}
                  onChange={this.changeExercise}
                  style={{ backgroundColor: "white" }}
                >
                  <MenuItem
                    key={"Select an Exercise"}
                    value={"Select an Exercise"}
                  >
                    {"Select an Exercise"}
                  </MenuItem>
                  {this.state.selectedExercises.map((item, i) => (
                    <MenuItem key={i} value={item.Exercise}>
                      {item.Exercise}
                    </MenuItem>
                  ))}
                </Select>
              )}
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
                      <Tab>Last Weight</Tab>
                      <Tab>Plots</Tab>
                      <Tab>Add</Tab>
                    </TabList>
                    <TabPanel>
                      <ExerciseResultsTable
                        exercise={this.state.selectedExercise.LastWeight}
                        person={this.state.selectedPerson}
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
                      <AddNewExercise
                        person={this.state.selectedPerson}
                        exercise={this.state.selectedExerciseName}
                      />
                    </TabPanel>
                  </Tabs>
                )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(
  mapStateToProps,
  { initializeFirebase, fetchFirebase }
)(GetLastWeightPage);

export { GetLastWeightPage };
