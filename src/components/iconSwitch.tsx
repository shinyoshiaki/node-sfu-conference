import styled from "@emotion/styled";
import React, { FC, ReactNode, useState } from "react";

export type IconSwitchProps = {
  initial: boolean;
  active: ReactNode;
  inactive: ReactNode;
  onClick?: (state: boolean) => void;
  className?: string;
};

export const IconSwitch: FC<IconSwitchProps> = ({
  initial,
  active,
  inactive,
  onClick,
  className,
}) => {
  const [state, setState] = useState(initial);

  const toggle = () => {
    if (onClick) onClick(!state);
    setState((v) => !v);
  };

  return (
    <Hover onClick={toggle} className={className}>
      {state ? active : inactive}
    </Hover>
  );
};

const Hover = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
