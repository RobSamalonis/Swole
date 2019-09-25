import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import GetLastWeightPage from "./pages/GetLastWeightPage";
import { initializeFirebase } from "./actions/firebase.action";
import { connect } from "react-redux";
// import Footer from "./components/Footer";

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
        <div className="header">
          <Header />
        </div>
        <main>
          <section className="section">
            {this.state.user &&
            this.props.firebase &&
            this.props.firebase.db ? (
              <React.Fragment>
                <MenuBar user={this.state.user} />
                <div>
                  <GetLastWeightPage
                    user={this.state.user}
                    firebase={this.props.firebase}
                  />
                </div>
              </React.Fragment>
            ) : (
              <div className="login">
                <FacebookLogin
                  cssClass="btnFacebook"
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  fields="name,email,picture"
                  callback={responseFacebook}
                />
              </div>
            )}
          </section>
        </main>
        {/* <div className="footer">
          <Footer />
        </div> */}
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
