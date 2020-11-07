import React, { createContext, FC } from "react";
import { RTCContext } from "./rtc";

export type ContextProps = { rtc: RTCContext };

export const Context = createContext<ContextProps>({} as any);

export const ContextProvider: FC<{ value: ContextProps }> = ({
  children,
  value,
}) => <Context.Provider value={value}>{children}</Context.Provider>;
