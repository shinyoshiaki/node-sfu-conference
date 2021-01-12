import ReactDOM from "react-dom";
import { App } from "./pages/App";
import { Provider } from "react-redux";
import createStore from "./redux/redux";
import { ContextProvider } from "./context/context";
import { RTCContext } from "./context/rtc";
import "antd/dist/antd.css";
import { fontSize, globalColors } from "./util/global-style";
import { css } from "@emotion/css";

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

document.body.className = css({
  margin: 0,
  fontsize: fontSize,
  fontFamily: '"Open Sans", sans-serif',
  fontWeight: "lighter",
  lineHeight: 1.5,
  height: "100vh",
  background: `linear-gradient(45deg, ${globalColors.lightblue}, ${globalColors.blue})`,
});
document.getElementById("root")!.className = css({
  height: "100vh",
  overflow: "hidden",
});

ReactDOM.render(
  <Provider store={store}>
    <ContextProvider rtc={rtc}>
      <App />
    </ContextProvider>
  </Provider>,
  document.getElementById("root")
);
