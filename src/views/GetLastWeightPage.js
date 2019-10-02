import React, { Component } from "react";
import { connect } from "react-redux";
import ExerciseResultsTable from "../components/ExerciseResultsTable";
import { initializeFirebase, fetchFirebase } from "../actions/firebase.action";
import AddNewExercise from "../components/AddNewExercise";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./GetLastWeightPage.css";

class GetLastWeightPage extends Component {
  constructor(props) {
    super(props);
    const myUser = props.user.name.split(" ");
    let uniq = {};
    const arrFiltered = props.firebase.db
      .filter(item => item.Person === myUser[0])
      .filter(obj => !uniq[obj.Exercise] && (uniq[obj.Exercise] = true));

    this.changeExercise = this.changeExercise.bind(this);
    this.state = {
      selectedPerson: myUser[0],
      exercises: [],
      selectedExercises: arrFiltered,
      selectedExerciseName: "Select an Exercise",
      updated: false,
      add: false,
      firebase: props.firebase
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
        selectedExercise: thing[0]
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.firebase && this.state.firebase.users && (
          <div className="lastWeightPage">
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
            </div>

            <div className="item">
              {this.state.selectedExercise &&
                this.state.selectedExerciseName !== "Select an Exercise" && (
                  <ExerciseResultsTable
                    exercise={this.state.selectedExercise.LastWeight}
                    person={this.state.selectedPerson}
                  />
                )}
            </div>
            <div className="item">
              {this.state.selectedExercise &&
                this.state.selectedExerciseName !== "Select an Exercise" && (
                  <React.Fragment>
                    <AddNewExercise
                      person={this.state.selectedPerson}
                      exercise={this.state.selectedExerciseName}
                    />
                  </React.Fragment>
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