import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import Login from "./components/Login";
import Records from "./components/Records";

import CustomizedSnackbars from "./components/SnackBar";
import GetLastWeightPage from "./views/GetLastWeightPage";
import { changeRoute } from "./actions/router.action";
import { closeSnack } from "./actions/firebase.action";

import Chart from "./components/Chart.js";
import CircularProgress from "@material-ui/core/CircularProgress";

import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.firebase.isFetching && (
          <div className="parent">
            <CircularProgress color="secondary" className="child" />
          </div>
        )}
        <Login />
        {this.props.firebase.user && (
          <Fade in={!!this.props.firebase.user}>
            <Grid className="grid" container>
              <Grid className="header" item xs={12}>
                <Header />
              </Grid>

              <Grid className="main" style={{ padding: "1em" }} item xs={12}>
                <div className="menu-main">
                  {(this.props.router.route === "Home" ||
                    !this.props.router.route) && <GetLastWeightPage />}
                  {this.props.router.route === "Records" && <Records />}
                  {this.props.router.route === "Chart" && (
                    <Chart exercise={this.state.selectedExercises} />
                  )}
                </div>
              </Grid>

              {this.props.firebase.snack && (
                <CustomizedSnackbars
                  close={this.props.closeSnack}
                  type="success"
                  snack={this.props.firebase.snack}
                />
              )}
            </Grid>
          </Fade>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, {
  changeRoute,
  closeSnack
})(App);

export { App };
