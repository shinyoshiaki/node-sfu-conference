import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/css";
import { globalColors } from "../util/global-style";

interface Props {
  displayName: string;
  controllers: ReactNode;
}
export const StreamController: FunctionComponent<Props> = ({
  displayName,
  controllers,
}: Props) => (
  <div className={wrapperStyle}>
    <div className={rowStyle}>{displayName}</div>
    <div className={rowStyle}>{controllers}</div>
  </div>
);

export default StreamController;

const wrapperStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  padding: 4,
  color: globalColors.white,
  backgroundColor: "rgba(0, 0, 0, .5)",
  fontSize: ".8rem",
});

const rowStyle = css({
  display: "inline-flex",
  alignItems: "center",
});
