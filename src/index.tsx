import React from "react";
import ReactDOM from "react-dom";
import { App } from "./pages/App";
import { Provider } from "react-redux";
import createStore from "./redux/redux";
import { ContextProvider } from "./context/context";
import { RTCContext } from "./context/rtc";

const endpointURL = (() => {
  //@ts-ignore
  switch (NODE_ENV || "") {
    case "dev":
      return "http://localhost:12222";
    default:
      return "https://node-sfu.tk";
  }
})();

const store = createStore();
const rtc = new RTCContext(endpointURL);

ReactDOM.render(
  <Provider store={store}>
    <ContextProvider value={{ rtc }}>
      <App />
    </ContextProvider>
  </Provider>,
  document.getElementById("root")
);
