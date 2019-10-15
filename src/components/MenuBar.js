import React, { Component } from "react";
import { connect } from "react-redux";

import { logout, changeRoute } from "../actions/firebase.action";
import Menu from "./Menu";

import "./MenuBar.css";
class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = { user: props.user };
  }

  render() {
    return (
      <div className="menu-bar">
        <img
          className="profile-pic"
          alt="profile-pic"
          src={this.state.user.picture.data.url}
        />
        <span className="userName">{this.state.user.name}</span>
        <div className="menu">
          <Menu
            logout={this.props.logout}
            changeRoute={this.props.changeRoute}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(
  mapStateToProps,
  { logout, changeRoute }
)(MenuBar);

export { MenuBar };
