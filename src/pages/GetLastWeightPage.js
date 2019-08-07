import React, { Component } from "react";
import { connect } from "react-redux";
import ExerciseResultsTable from "../components/ExerciseResultsTable";
import { initializeFirebase, fetchFirebase } from "../actions/firebase.action";
import AddNewExercise from "../components/AddNewExercise";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import "./GetLastWeightPage.css";

class GetLastWeightPage extends Component {
  constructor(props) {
    super(props);

    this.changeExercise = this.changeExercise.bind(this);
    this.adding = this.adding.bind(this);
    this.state = {
      selectedPerson: "Who are you?",
      exercises: [],
      selectedExerciseName: "Select an Exercise",
      selectedExercises: null,
      updated: false,
      add: false
    };
  }
  getExercises = () => {
    var uniq = {};
    const arrFiltered = this.props.firebase.db
      .filter(item => item.Person === this.state.selectedPerson)
      .filter(obj => !uniq[obj.Exercise] && (uniq[obj.Exercise] = true));
    this.setState({
      selectedExercises: arrFiltered,
      selectedExerciseName: "Select an Exercise"
    });
  };

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

  componentWillMount() {
    this.props.initializeFirebase();
  }

  handlePersonChange = event => {
    if (event.target.value === "Who are you?")
      this.setState({
        selectedPerson: "Who are you?",
        selectedExercises: null,
        selectedExercise: null,
        selectedExerciseName: "Select an Exercise"
      });
    else
      this.setState(
        {
          selectedPerson: event.target.value
        },
        this.getExercises
      );
  };

  adding() {
    this.setState({ add: !this.state.add });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.firebase && this.props.firebase.users && (
          <div>
            <div className="item">
              <Select
                value={this.state.selectedPerson}
                onChange={this.handlePersonChange}
                style={{ backgroundColor: "white" }}
              >
                <MenuItem value="Who are you?">Who are you?</MenuItem>

                {this.props.firebase.users.map((x, y) => (
                  <MenuItem key={y} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </div>
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
              {this.state.selectedPerson &&
                this.state.selectedPerson !== "Who are you?" && (
                  <div>
                    {!this.state.add && (
                      <Button variant="contained" onClick={this.adding}>
                        Add New Exercise
                      </Button>
                    )}

                    {this.state.add && (
                      <React.Fragment>
                        <Button variant="contained" onClick={this.adding}>
                          Close
                        </Button>
                        <AddNewExercise person={this.state.selectedPerson} />
                      </React.Fragment>
                    )}
                  </div>
                )}
            </div>
            <div className="item">
              {this.state.selectedPerson &&
                this.state.selectedPerson !== "Who are you?" &&
                this.state.selectedExercise &&
                this.state.selectedExerciseName !== "Select an Exercise" && (
                  <ExerciseResultsTable
                    exercise={this.state.selectedExercise.LastWeight}
                    person={this.state.selectedPerson}
                  />
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
