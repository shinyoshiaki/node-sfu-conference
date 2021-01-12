import { FunctionComponent, SyntheticEvent } from "react";
import { css } from "@emotion/css";
import { globalColors, fontSize } from "../util/global-style";

interface Props {
  name: string;
  showEdge?: boolean;
}
export const Icon: FunctionComponent<Props> = ({ name, showEdge }: Props) => (
  <i
    className={`material-icons ${
      showEdge ? iconStyle + " " + edgedStyle : iconStyle
    }`}
  >
    {name}
  </i>
);

interface ButtonProps extends Props {
  onClick: (ev: SyntheticEvent<HTMLButtonElement>) => void;
  title?: string;
  disabled?: boolean;
}
export const IconButton: FunctionComponent<ButtonProps> = ({
  name,
  showEdge,
  title,
  disabled,
  onClick,
}: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    title={title}
    className={disabled ? buttonStyle + " " + disabledStyle : buttonStyle}
  >
    <Icon name={name} showEdge={showEdge} />
  </button>
);

const iconStyle = css({
  fontSize,
});

const edgedStyle = css({
  textShadow: `0 0 1px ${globalColors.black}`,
});

console.log(iconStyle, edgedStyle);

const imgStyle = css({
  height: fontSize,
});

const buttonStyle = css({
  padding: "0 1px",
  height: fontSize,
  appearance: "none",
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer",
});

const disabledStyle = css({
  opacity: 0.6,
  cursor: "not-allowed",
});
