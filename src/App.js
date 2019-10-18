import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import GetLastWeightPage from "./views/GetLastWeightPage";
import {
  initializeFirebase,
  login,
  changeRoute
} from "./actions/firebase.action";
import { connect } from "react-redux";

import FacebookLogin from "react-facebook-login";
// import { GoogleLogin } from "react-google-login";

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
    // const responseGoogle = response => {
    //   this.props.login(response);
    //   this.setState({ open: false });
    // };
    return (
      <div className="App">
        <Modal
          open={!this.props.firebase.user}
          className="modal"
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={!this.props.firebase.user}>
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
              {/* <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              /> */}
            </div>
          </Fade>
        </Modal>
        <Grid className="grid" container>
          <Grid className="header" item xs={12}>
            <Header firebase={this.props.firebase} />
          </Grid>
          <Grid className="main" style={{ padding: "1em" }} item xs={12}>
            {this.props.firebase.user && this.props.firebase.db && (
              <div className="menu-main">
                {(this.props.firebase.route === "Home" ||
                  !this.props.firebase.route) && (
                  <GetLastWeightPage
                    user={this.props.firebase.user}
                    firebase={this.props.firebase}
                  />
                )}
                {this.props.firebase.route === "Profile" && <Profile />}
              </div>
            )}
            {!this.props.firebase.user && (
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
