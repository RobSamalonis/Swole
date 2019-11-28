import React, { Component } from "react";
import { connect } from "react-redux";

import { changeRoute } from "../actions/router.action";
import { logout } from "../actions/auth.action";

import Menu from "./Menu";

import "./MenuBar.css";
class MenuBar extends Component {
  render() {
    return (
      <div className="menu-bar">
        <div className="menu">
          <Menu
            logout={this.props.logout}
            changeRoute={this.props.changeRoute}
          />
        </div>
        <span className="userName">{this.props.user.name.split(" ")[0]}</span>
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
