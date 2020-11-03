import React, { FC, useState, useRef, useEffect } from "react";
//@ts-expect-error
import Worker from "../test.worker";

export const App: FC = () => {
  const workerRef = useRef<Worker>(new Worker());
  const [msg, setMsg] = useState("msg");

  useEffect(() => {
    const worker = workerRef.current;
    worker.onmessage = (e: any) => {
      setMsg(e.data);
    };
    worker.postMessage("call");
    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div>
      {msg}
      <button>aaa</button>
    </div>
  );
};
