import React, { Component } from "react";
import { connect } from "react-redux";
import { addExercise } from "../actions/firebase.action";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./AddNewExercise.css";

class AddNewExercise extends Component {
  constructor(props) {
    super(props);
    this.addSet = this.addSet.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { exercise: props.exercise, sets: [{ Weight: "", Reps: "" }] };
  }

  addSet() {
    this.setState({ sets: this.state.sets.concat([{ Weight: "", Reps: "" }]) });
  }

  removeSet(index) {
    const filteredSet = this.state.sets;
    filteredSet.splice(index, 1);
    this.setState({ sets: filteredSet });
  }

  handleWeightChange(index, event) {
    let newArray = this.state.sets;
    newArray[index].Weight = event.target.value;
    this.setState({ sets: newArray });
  }

  handleRepChange(index, event) {
    let newArray = this.state.sets;
    newArray[index].Reps = event.target.value;
    this.setState({ sets: newArray });
  }

  handlePersonChange(event) {
    this.setState({ Person: event.target.value });
  }

  handleExerciseChange(event) {
    this.setState({
      exercise:
        event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
    });
  }

  handleSubmit() {
    if (
      this.props.person === "Who are you?" ||
      this.state.exercise === "" ||
      this.state.sets[0].Weight === "" ||
      this.state.sets[0].Reps === ""
    ) {
      alert("Please fill in all required fields");
    } else {
      this.props.addExercise([
        {
          Person: this.props.person,
          Exercise: this.state.exercise,
          LastWeight: this.state.sets
        },
        ...this.props.firebase.db
      ]);
    }
  }

  render() {
    return (
      <div className="addNewExercise">
        <form className="newForm">
          {this.state.sets.map((x, y) => (
            <div key={y}>
              Set {y + 1}
              <TextField
                className="weight"
                label={`Weight`}
                value={this.state.sets[y].Weight}
                onChange={e => this.handleWeightChange(y, e)}
                margin="normal"
                style={{ paddingRight: "1em" }}
              />
              <TextField
                className="reps"
                label={`Reps`}
                value={this.state.sets[y].Reps}
                onChange={e => this.handleRepChange(y, e)}
                margin="normal"
                style={{ paddingRight: "1em" }}
              />
              <Button
                style={{
                  display: "inline",
                  top: "28px",
                  visibility: this.state.sets.length === 1 && "hidden"
                }}
                className="add"
                variant="contained"
                onClick={() => this.removeSet(y)}
              >
                X
              </Button>
            </div>
          ))}

          <Button
            style={{
              marginTop: "1em",
              backgroundColor: "#BB86FC"
            }}
            variant="contained"
            onClick={this.addSet}
          >
            Add Set
          </Button>

          <Button
            variant="contained"
            style={{
              marginTop: "1em",
              float: "right",
              backgroundColor: "#BB86FC"
            }}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(
  mapStateToProps,
  { addExercise }
)(AddNewExercise);

export { AddNewExercise };
