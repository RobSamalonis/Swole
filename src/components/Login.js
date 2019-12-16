import React, { Component } from "react";
import { connect } from "react-redux";

import {
  createAccount,
  initializeFirebase,
  signin,
  signout,
  verifyUser
} from "../actions/firebase.action";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordVerificationChange = this.handlePasswordVerificationChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      password: "",
      email: "",
      name: "",
      passwordVerification: "",
      createAccount: false
    };
  }

  componentDidMount() {
    this.props.verifyUser();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePasswordVerificationChange(event) {
    this.setState({ passwordVerification: event.target.value });
  }

  close(event) {
    this.setState({ createAccount: false });
  }

  validateCreds = () => {
    if (
      this.state.password === this.state.passwordVerification &&
      this.state.password.length > 6
    ) {
      return true;
    }
    return false;
  };

  handleSubmit() {
    if (this.state.createAccount) {
      if (this.validateCreds())
        this.props.createAccount(
          this.state.email,
          this.state.password,
          this.state.name
        );
    } else {
      this.handleSignIn();
    }
  }

  handleCreateAccount() {
    this.setState({ createAccount: true });
  }

  handleSignIn() {
    this.props.signin(this.state.email, this.state.password);
  }

  handleSignOut() {
    this.props.signout();
  }

  render() {
    return (
      <div>
        {!this.props.firebase.verifyingUser && (
          <Modal
            open={!this.props.firebase.user}
            className="modal"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <div className="paper">
              {this.state.createAccount ? (
                <h3>Create Account</h3>
              ) : (
                <h3>Login</h3>
              )}
              <TextField
                className="email"
                label={`Email`}
                fullWidth
                value={this.state.email}
                onChange={e => this.handleEmailChange(e)}
                margin="normal"
                style={{ display: "block" }}
              />
              {this.state.createAccount && (
                <TextField
                  fullWidth
                  className="name"
                  label={`Name`}
                  value={this.state.name}
                  onChange={e => this.handleNameChange(e)}
                  margin="normal"
                  style={{ display: "block" }}
                />
              )}
              <TextField
                fullWidth
                type="password"
                className="password"
                label={`Password`}
                value={this.state.password}
                onChange={e => this.handlePasswordChange(e)}
                margin="normal"
                style={{ display: "block" }}
              />
              {this.state.createAccount && (
                <TextField
                  fullWidth
                  type="password"
                  className="password"
                  label={`Verify Password`}
                  value={this.state.passwordVerification}
                  onChange={e => this.handlePasswordVerificationChange(e)}
                  margin="normal"
                  style={{ display: "block" }}
                />
              )}

              <Button
                variant="contained"
                style={{
                  color: "white",
                  marginTop: "1em",
                  float: "left",
                  backgroundColor: "#BB86FC",
                  marginRight: "1em"
                }}
                onClick={this.handleSubmit}
                className="submit-button"
              >
                {this.state.createAccount ? "Create Account" : "Sign In"}
              </Button>

              {!this.state.createAccount ? (
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    marginTop: "1em",
                    backgroundColor: "#BB86FC"
                  }}
                  onClick={this.handleCreateAccount}
                  className="create-button"
                >
                  Create Account
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    marginTop: "1em",
                    backgroundColor: "#BB86FC"
                  }}
                  onClick={this.close}
                  className="create-button"
                >
                  Return
                </Button>
              )}
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, {
  createAccount,
  initializeFirebase,
  signin,
  signout,
  verifyUser
})(Login);

export { Login };
