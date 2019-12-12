import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Profile from "./components/Profile";

import GetLastWeightPage from "./views/GetLastWeightPage";
import { changeRoute } from "./actions/router.action";
import { initializeFirebase } from "./actions/firebase.action";

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
        <Login />
        {this.props.firebase && this.props.firebase.user && (
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

              <Footer />
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
