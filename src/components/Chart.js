import React, { Component } from "react";
import { connect } from "react-redux";

import { Line } from "react-chartjs-2";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./Chart.css";

class LinePlot extends Component {
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

  resetGraphs = props => {
    const selected = this.props.firebase.record.filter(
      item => item.Exercise === props.selectedExerciseName
    );
    const arr = selected.map((item, i) => i + 1);

    const totalWeights = selected.map(item =>
      item.LastWeight.map(item => item.Weight * item.Reps).reduce(
        (acc, currentValue) => acc + currentValue,
        0
      )
    );
    const averageWeights = totalWeights.map((item, i) => {
      const totalSets = selected[i].LastWeight.reduce(
        (acc, currentValue) => acc + Number(currentValue.Reps),
        0
      );
      return (item / totalSets).toFixed(0);
    });

    const topWeights = selected.map(item =>
      Math.max(...item.LastWeight.map(item => item.Weight))
    );

    const topWeightData = this.getData(arr, topWeights, "Top Set Weight (lbs)");
    const totalWeightData = this.getData(
      arr,
      totalWeights,
      "Total Weight Lifted (lbs)"
    );

    const averageWeightData = this.getData(
      arr,
      averageWeights,
      "Average Weight Lifted (lbs)"
    );

    this.changeChartType = this.changeChartType.bind(this);

    return {
      totalWeightData,
      topWeightData,
      averageWeightData,
      key: Math.random(),
      chartType: "Average Set Weights"
    };
  };

  constructor(props) {
    super(props);
    this.state = this.resetGraphs(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this.resetGraphs(props));
  }

  changeChartType = event => {
    this.setState({
      chartType: event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.firebase.record.filter(
          item => item.Exercise === this.props.selectedExerciseName
        ).length > 1 && (
          <React.Fragment>
            <h2>Graphs</h2>

            <div className="charts">
              {this.state.chartType === "Volume" && (
                <Line
                  ref="chart"
                  data={this.state.totalWeightData}
                  redraw
                  key={this.state.key}
                />
              )}
              {this.state.chartType === "Top Set Weights" && (
                <Line
                  ref="chart"
                  data={this.state.topWeightData}
                  redraw
                  key={this.state.key + 100}
                />
              )}
              {this.state.chartType === "Average Set Weights" && (
                <Line
                  ref="chart"
                  data={this.state.averageWeightData}
                  redraw
                  key={this.state.key + 200}
                />
              )}
            </div>
            <Select
              value={this.state.chartType}
              onChange={this.changeChartType}
              style={{ backgroundColor: "white", float: "right" }}
            >
              <MenuItem
                key={"Average Set Weights"}
                value={"Average Set Weights"}
              >
                Average Set Weights
              </MenuItem>
              <MenuItem key={"Top Set Weights"} value={"Top Set Weights"}>
                Top Set Weights
              </MenuItem>
              <MenuItem key={"Volume"} value={"Volume"}>
                Volume
              </MenuItem>
            </Select>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, {})(LinePlot);

export { LinePlot };
