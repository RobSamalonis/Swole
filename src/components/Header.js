import React, { Component } from "react";

import MenuBar from "./MenuBar";

import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header>
        <span className="App-header">
          <h1 className="App-title">Swole</h1>
        </span>

        {this.props.firebase.user && (
          <MenuBar user={this.props.firebase.user} />
        )}
      </header>
    );
  }
}

export default Header;
