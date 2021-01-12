import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/css";
import { zIndex } from "../util/style";

interface Props {
  children: ReactNode;
}
const LeftBottom: FunctionComponent<Props> = ({ children }: Props) => (
  <div className={wrapperStyle}>
    <div className={bottomStyle}>{children}</div>
  </div>
);

export default LeftBottom;

const wrapperStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: zIndex.base,
});

const bottomStyle = css({
  position: "absolute",
  left: 8,
  bottom: 8,
});
