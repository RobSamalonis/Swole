import React, { Component } from "react";
import "./styles/App.css";

import Header from "./components/Header";
import ExercisesSheet from "./components/ExercisesSheet";
import GetLastWeightPage from "./pages/GetLastWeightPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="flex-item">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="flex-item">
            <GetLastWeightPage />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
