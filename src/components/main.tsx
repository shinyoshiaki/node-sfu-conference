import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/css";

interface Props {
  children: ReactNode;
}
const Main: FunctionComponent<Props> = ({ children }) => (
  <div className={wrapperStyle}>{children}</div>
);

export default Main;

const wrapperStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundImage: "url(./images/logo.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
});
