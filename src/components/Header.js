import React, { Component } from "react";
import { connect } from "react-redux";
import MenuBar from "./MenuBar";

import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header>
        <span className="App-header">
          <h1 className="App-title">Swole</h1>
        </span>

        {this.props.firebase && this.props.firebase.user && (
          <MenuBar user={this.props.firebase.user} />
        )}
      </header>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, {})(Header);

export { Header };
