import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./Chart.css";

export default class LinePlot extends Component {
  getData = (myLabels, myData, myTitle) => {
    return {
      labels: myLabels,
      datasets: [
        {
          label: myTitle,
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
          data: myData.reverse()
        }
      ]
    };
  };

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
    const topWeights = props.exercise.map(item =>
      Math.max(...item.LastWeight.map(item => item.Weight))
    );

    const topWeightData = this.getData(arr, topWeights, "Top Set Weight (lbs)");
    const totalWeightData = this.getData(
      arr,
      totalWeights,
      "Total Weight Lifted (lbs)"
    );

    this.state = {
      exercise: props.exercise,
      totalWeightData,
      topWeightData,
      key: Math.random()
    };
  }
  render() {
    return (
      <React.Fragment>
        <Tabs>
          <TabList>
            <Tab>Volume</Tab>
            <Tab>Top Set Weights</Tab>
          </TabList>
          <TabPanel>
            <Line
              ref="chart"
              data={this.state.totalWeightData}
              redraw
              key={this.state.key}
            />
          </TabPanel>
          <TabPanel>
            <Line
              ref="chart"
              data={this.state.topWeightData}
              redraw
              key={this.state.key}
            />
          </TabPanel>
        </Tabs>
      </React.Fragment>
    );
  }
}
