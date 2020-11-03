import React, { createContext, FC } from "react";

export const ServiceContext = createContext({});

export const ServiceProvider: FC = ({ children }) => (
  <ServiceContext.Provider value={{}}>{children}</ServiceContext.Provider>
);
