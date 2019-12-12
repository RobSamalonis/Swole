import React, { Component } from "react";
import { connect } from "react-redux";

import { changeRoute } from "../actions/router.action";
import { signout } from "../actions/firebase.action";

import Menu from "./Menu";

import "./MenuBar.css";

class MenuBar extends Component {
  render() {
    return (
      <div className="menu-bar">
        <div className="menu">
          <Menu
            changeRoute={this.props.changeRoute}
            signout={this.props.signout}
          />
        </div>
        <span className="userName">{this.props.user.displayName}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { changeRoute, signout })(MenuBar);

export { MenuBar };
