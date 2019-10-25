import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import GetLastWeightPage from "./views/GetLastWeightPage";
import { initializeFirebase } from "./actions/firebase.action";
import { login } from "./actions/auth.action";
import { changeRoute } from "./actions/router.action";
import { connect } from "react-redux";

import FacebookLogin from "react-facebook-login";

import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
        <Modal
          open={!this.props.auth.user}
          className="modal"
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={!this.props.auth.user}>
            <div className="paper">
              <div>
                <h3>Welcome to Swole!</h3>
              </div>
              <p>Login with a provider to continue.</p>

              <FacebookLogin
                cssClass="btnFacebook"
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Continue with Facebook"
              />
            </div>
          </Fade>
        </Modal>
        <Grid className="grid" container>
          <Grid className="header" item xs={12}>
            <Header />
          </Grid>
          <Grid className="main" style={{ padding: "1em" }} item xs={12}>
            {this.props.auth && this.props.auth.user && (
              <div className="menu-main">
                {(this.props.router.route === "Home" ||
                  !this.props.router.route) && (
                  <GetLastWeightPage
                    user={this.props.auth.user}
                    firebase={this.props.firebase}
                  />
                )}
                {this.props.router.route === "Profile" && <Profile />}
              </div>
            )}
            {!this.props.auth.user && (
              <h3 onClick={this.handleOpen} className="login-please">
                Login to get Swole <i className="fab fa-angellist"></i>
              </h3>
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
