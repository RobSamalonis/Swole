import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/Profile";

import CustomizedSnackbars from "./components/SnackBar";
import GetLastWeightPage from "./views/GetLastWeightPage";
import { changeRoute } from "./actions/router.action";
import { initializeFirebase } from "./actions/firebase.action";

import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.initializeFirebase();
  }

  render() {
    return (
      <div className="App">
        {this.props.firebase.isFetching && <LinearProgress />}
        {this.props.firebase.db && <Login />}
        {this.props.firebase.user && this.props.firebase.db && (
          <Fade in={!!this.props.firebase.user}>
            <Grid className="grid" container>
              <Grid className="header" item xs={12}>
                <Header />
              </Grid>

              <Grid className="main" style={{ padding: "1em" }} item xs={12}>
                <div className="menu-main">
                  {(this.props.router.route === "Home" ||
                    !this.props.router.route) && <GetLastWeightPage />}
                  {this.props.router.route === "Profile" && <Profile />}
                </div>
              </Grid>
              {this.props.firebase.addExerciseSuccess !== "initial" && (
                <CustomizedSnackbars
                  type={this.props.firebase.addExerciseSuccess}
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
  initializeFirebase,
  changeRoute
})(App);

export { App };
