import React, { Component } from "react";
import { connect } from "react-redux";

import { addExercise } from "../actions/firebase.action";

import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import "./AddNewExercise.css";

class AddNewExercise extends Component {
  constructor(props) {
    super(props);
    this.addSet = this.addSet.bind(this);
    this.removeSet = this.removeSet.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      sets: [{ Weight: "", Reps: "" }]
    };
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

  handleSubmit() {
    const trimmedSets = this.state.sets.filter(item => {
      return (
        !isNaN(item.Weight) &&
        !isNaN(item.Reps) &&
        item.Weight !== "" &&
        item.Reps !== ""
      );
    });

    if (trimmedSets.length === 0) {
      alert("Please fill in all required fields.");
    } else {
      const x = new Date();
      this.props.addExercise(
        [
          {
            Person: {
              uid: this.props.firebase.user.uid,
              email: this.props.firebase.user.email,
              name: this.props.firebase.user.displayName
            },
            Exercise: this.props.exercise,
            LastWeight: trimmedSets,
            date: x
          },
          ...this.props.firebase.db
        ],
        this.props.handleClose()
      );
    }
  }

  render() {
    return (
      <div className="add-new-exercise">
        <form>
          {this.state.sets.map((x, y) => (
            <Fade direction="right" in={true} key={y}>
              <div className="set-item">
                <div>
                  Set #{y + 1}
                  <i
                    style={{
                      float: "right",
                      display: "inline",
                      visibility: this.state.sets.length === 1 && "hidden"
                    }}
                    onClick={() => this.removeSet(y)}
                    className="far fa-trash-alt"
                  ></i>
                </div>
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
                <hr />
              </div>
            </Fade>
          ))}
          <Grid className="grid" container>
            <Grid item xs={12}>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#BB86FC",
                  float: "left"
                }}
                variant="contained"
                onClick={this.addSet}
                className="add-button"
              >
                Add Set
              </Button>

              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#BB86FC",
                  float: "right"
                }}
                onClick={this.handleSubmit}
                className="submit-button"
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{
                  marginTop: "1em",
                  color: "white",
                  backgroundColor: "#FF605C"
                }}
                onClick={this.props.handleClose}
                className="submit-button"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { addExercise })(AddNewExercise);

export { AddNewExercise };
