import React, { Component } from "react";

import "./ExerciseResultsTable.css";

class ExerciseResultsTable extends Component {
  constructor(props) {
    super(props);

    this.state = { edit: false };
  }

  render() {
    return (
      <div>
        <table className="exerciseTable">
          <thead>
            <tr>
              <th>Set #</th>
              <th>Weight</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            {this.props.exercise.map((x, y) => {
              return (
                <tr key={y}>
                  <th>Set {y + 1}</th>
                  <td>{x.Weight}</td>
                  <td>{x.Reps}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExerciseResultsTable;
