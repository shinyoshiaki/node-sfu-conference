import React, { FC, useState, useRef, useEffect } from "react";
import { startup } from "../domain/startup";

export const App: FC = () => {
  const [msg, setMsg] = useState("msg");

  useEffect(() => {
    startup();
  }, []);

  return (
    <div>
      {msg}
      <button>aaa</button>
    </div>
  );
};
