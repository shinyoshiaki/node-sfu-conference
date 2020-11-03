import React, { FC, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LocalMedia } from "../containers/localMedia";
import { startup } from "../domain/startup";

export const App: FC = () => {
  const [msg, setMsg] = useState("msg");
  const dispatch = useDispatch();

  useEffect(() => {
    startup(dispatch);
  }, [dispatch]);

  return (
    <div>
      <LocalMedia />
    </div>
  );
};
