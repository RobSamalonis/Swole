import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class LinePlot extends Component {
  constructor(props) {
    super(props);
    let arr = [];
    props.exercise.map((item, i) => arr.push(i + 1));
    const totalWeights = props.exercise.map(item =>
      item.LastWeight.map(item => item.Weight * item.Reps).reduce(
        (acc, currentValue) => {
          return acc + currentValue;
        },
        0
      )
    );
    const data = {
      labels: arr,
      datasets: [
        {
          label: "Total Weight (lbs)",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: totalWeights
        }
      ]
    };
    this.state = { exercise: props.exercise, data: data };
  }

  render() {
    return (
      <div>
        <Line ref="chart" data={this.state.data} />
      </div>
    );
  }
}
