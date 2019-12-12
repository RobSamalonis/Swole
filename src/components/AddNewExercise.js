import React, { Component } from "react";
import { connect } from "react-redux";

import { addExercise } from "../actions/firebase.action";

import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
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
    this.state = { sets: [{ Weight: "", Reps: "" }] };
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
    if (this.state.sets[0].Weight === "" || this.state.sets[0].Reps === "") {
      alert("Please fill in all required fields.");
    } else {
      const x = new Date();
      const trimmedSets = this.state.sets.filter(
        item => item.Weight !== "" && item.Reps !== ""
      );
      this.props.addExercise([
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
      ]);
    }
  }

  render() {
    return (
      <div className="add-new-exercise">
        <form>
          {this.state.sets.map((x, y) => (
            <Slide direction="right" in={true} key={y}>
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
            </Slide>
          ))}

          <Button
            style={{
              color: "white",
              marginTop: "1em",
              backgroundColor: "#BB86FC"
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
              marginTop: "1em",
              float: "right",
              backgroundColor: "#BB86FC"
            }}
            onClick={this.handleSubmit}
            className="submit-button"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { addExercise })(AddNewExercise);

export { AddNewExercise };
