import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MenuBar from "./components/MenuBar";
import GetLastWeightPage from "./views/GetLastWeightPage";
import {
  initializeFirebase,
  login,
  changeRoute
} from "./actions/firebase.action";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Profile from "./components/Profile";
import FacebookLogin from "react-facebook-login";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.initializeFirebase();
  }

  render() {
    const responseFacebook = response => {
      this.props.login(response);
    };
    return (
      <div className="App">
        <Grid className="grid" container>
          <Grid className="header" item xs={12}>
            <Header />
          </Grid>
          <Grid className="main" style={{ padding: "1em" }} item xs={12}>
            {this.props.firebase.user &&
            this.props.firebase &&
            this.props.firebase.db ? (
              <div className="menu-main">
                <MenuBar user={this.props.firebase.user} />

                {(this.props.firebase.route === "Home" ||
                  !this.props.firebase.route) && (
                  <GetLastWeightPage
                    user={this.props.firebase.user}
                    firebase={this.props.firebase}
                  />
                )}
                {this.props.firebase.route === "Profile" && <Profile />}
              </div>
            ) : (
              <React.Fragment>
                <span>Please login to Continue: </span>
                <FacebookLogin
                  cssClass="btnFacebook"
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  fields="name,email,picture"
                  callback={responseFacebook}
                />
              </React.Fragment>
            )}
          </Grid>
          <Footer />
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state });

export default connect(
  mapStateToProps,
  { initializeFirebase, login, changeRoute }
)(App);

export { App };
