import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import GetLastWeightPage from "./views/GetLastWeightPage";
import { changeRoute } from "./actions/router.action";
import { initializeFirebase } from "./actions/firebase.action";
import { login } from "./actions/auth.action";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeUser = this.changeUser.bind(this);

    this.state = {
      pw: "",
      auth: false,
      user: "Select"
    };
  }

  componentDidMount() {
    this.props.initializeFirebase();
  }

  handlePWChange(event) {
    this.setState({ pw: event.target.value });
  }

  handleSubmit() {
    if (this.state.pw !== "arnold") {
      alert("Wrong.");
    } else {
      this.setState({ auth: true });
    }
  }

  changeUser = event => {
    let currentUser;
    if (event.target.value === "Rob")
      currentUser = {
        email: "reelhandsomrob@yahoo.com",
        id: "2561762150512750",
        name: "Rob Samalonis"
      };
    else if (event.target.value === "Taylor")
      currentUser = {
        email: "tayloraj10@gmail.com",
        id: "123456789",
        name: "Taylor Johnson"
      };
    else currentUser = null;

    this.props.login(currentUser);
    this.setState({
      user: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        {!this.state.auth && (
          <Modal
            open={!this.state.auth}
            className="modal"
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
                <TextField
                  className="pw"
                  label={`Password`}
                  value={this.state.pw}
                  onChange={e => this.handlePWChange(e)}
                  margin="normal"
                  style={{ paddingRight: "1em" }}
                />
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    marginTop: "1em",

                    backgroundColor: "#BB86FC"
                  }}
                  onClick={this.handleSubmit}
                  className="submit-button"
                >
                  Submit
                </Button>
              </div>
            </Fade>
          </Modal>
        )}

        {this.state.auth && (
          <Fade in={this.state.auth}>
            {!this.props.auth.user ? (
              <Select
                value={this.state.user}
                onChange={this.changeUser}
                style={{ backgroundColor: "white", float: "left" }}
              >
                <MenuItem key={"Select"} value="Select">
                  Select
                </MenuItem>
                <MenuItem key={"Rob"} value="Rob">
                  Rob
                </MenuItem>
                <MenuItem key={"Taylor"} value="Taylor">
                  Taylor
                </MenuItem>
              </Select>
            ) : (
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
            )}
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
