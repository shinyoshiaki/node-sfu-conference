import styled from "@emotion/styled";
import React, { CSSProperties, FC, ReactNode, useEffect, useRef } from "react";

export type MediaProps = {
  controls?: ReactNode;
  className?: string;
  video?: MediaStreamTrack;
  audio?: MediaStreamTrack;
};

export const Media: FC<MediaProps> = ({
  controls,
  className,
  audio,
  video,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (video) {
        const stream = new MediaStream();
        stream.addTrack(video);
        videoRef.current.srcObject = stream;
      } else {
        videoRef.current.srcObject = null;
      }
    }
  }, [video]);

  useEffect(() => {
    if (audioRef.current) {
      if (audio) {
        const stream = new MediaStream();
        stream.addTrack(audio);
        audioRef.current.srcObject = stream;
      } else {
        audioRef.current.srcObject = null;
      }
    }
  }, [audio]);

  return (
    <Container className={className}>
      <Controls>{controls}</Controls>
      <div>
        <video
          autoPlay
          playsInline
          ref={videoRef}
          style={{ height: "-webkit-fill-available", width: "100%" }}
        />
        <audio autoPlay playsInline ref={audioRef} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #4baa53;
  opacity: 0.8;
  border: 1px solid;
  border-color: gray;
`;

const Controls = styled.div`
  position: absolute;
  z-index: 10;
  right: 0;
  padding: 5px;
`;
