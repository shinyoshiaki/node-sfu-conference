import * as React from "react";
import { useState, useEffect } from "react";
import hark from "hark";
import styled from "@emotion/styled";

export type VADetectorProps = {
  track?: MediaStreamTrack;
};

export const VADetector: React.FC<VADetectorProps> = ({ track }) => {
  const [decibel, setDecibel] = useState(-Infinity);
  useEffect(() => {
    if (!track) return;

    const stream = new MediaStream();
    stream.addTrack(track);

    console.log({ track });

    const harker = hark(stream, { threshold: -75 });
    // db: -100 ~ 0 (silent ~ loud)
    harker.on("volume_change", (db) => {
      db !== -Infinity && setDecibel(db);
    });

    return () => harker.stop();
  }, [track]);

  return <Styled style={decibelToStyle(decibel)} />;
};

const decibelToStyle = (db: number) => {
  if (db === -Infinity) return {};

  const audioLevel = db + 100; // 0 ~ 100
  return {
    height: audioLevel * 0.15, // 0 ~ 15px
    opacity: audioLevel * 0.01, // 0 ~ 1
  };
};

const Styled = styled.div`
  background-color: #005ece;
`;
