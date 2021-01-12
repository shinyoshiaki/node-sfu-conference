import { createContext, FC, useContext } from "react";
import { RTCContext } from "./rtc";

const Context = createContext<RTCContext>({} as any);

export const ContextProvider: FC<{ rtc: RTCContext }> = ({ children, rtc }) => (
  <Context.Provider value={rtc}>{children}</Context.Provider>
);

export const useManager = () => useContext(Context);
