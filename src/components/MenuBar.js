import React, { Component } from "react";
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
      </div>
    );
  }
}

export default MenuBar;
