import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import GetLastWeightPage from "./views/GetLastWeightPage";
import { changeRoute } from "./actions/router.action";
import { initializeFirebase } from "./actions/firebase.action";
import { login } from "./actions/auth.action";

import FacebookLogin from "react-facebook-login";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";

import "./App.css";

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
                <h3>Welcome!</h3>
              </div>
              <p>
                Login to get{" "}
                <b>
                  <i>Swole</i>
                </b>
                .
              </p>

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
        {this.props.auth && this.props.firebase && this.props.auth.user && (
          <Fade in={!!this.props.auth.user}>
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

export default connect(
  mapStateToProps,
  { initializeFirebase, login, changeRoute }
)(App);

export { App };
