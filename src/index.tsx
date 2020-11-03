import React from "react";
import ReactDOM from "react-dom";
import { App } from "./pages/App";
import { Provider } from "react-redux";
import createStore from "./redux/createStore";
import { ServiceProvider } from "./services/services";

const store = createStore();

ReactDOM.render(
  <ServiceProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ServiceProvider>,
  document.getElementById("root")
);
