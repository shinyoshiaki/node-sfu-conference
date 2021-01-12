import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/css";

interface Props {
  children: ReactNode;
}
const Layout: FunctionComponent<Props> = ({ children }) => (
  <div className={wrapperStyle}>{children}</div>
);

export default Layout;

const wrapperStyle = css({
  height: "100vh",
  position: "relative",
});
