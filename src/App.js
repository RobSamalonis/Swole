import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MenuBar from "./components/MenuBar";
import GetLastWeightPage from "./views/GetLastWeightPage";
import { initializeFirebase } from "./actions/firebase.action";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import FacebookLogin from "react-facebook-login";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.initializeFirebase();
    this.state = {
      user: null
    };
  }
  render() {
    const responseFacebook = response => {
      this.setState({ user: response });
    };
    return (
      <div className="App">
        <Grid container>
          <Grid className="header" item xs={12}>
            <Header />
          </Grid>
          <Grid className="main" style={{ padding: "1em" }} item xs={12}>
            {this.state.user &&
            this.props.firebase &&
            this.props.firebase.db ? (
              <React.Fragment>
                <MenuBar user={this.state.user} />

                <GetLastWeightPage
                  user={this.state.user}
                  firebase={this.props.firebase}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
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
  { initializeFirebase }
)(App);

export { App };
