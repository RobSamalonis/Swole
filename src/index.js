import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import configureStore from "./configure-store";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";

import "./index.css";

const store = configureStore();

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    document.getElementById("root")
  );
}

render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    render(App);
  });
}
