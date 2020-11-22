import styled from "@emotion/styled";
import { CSSProperties, FC, ReactNode, useEffect, useRef } from "react";
import { VADetector } from "./va-detector";

export type MediaProps = {
  controls?: ReactNode;
  className?: string;
  video?: MediaStreamTrack;
  audio?: MediaStreamTrack;
  audioPlay?: boolean;
};

export const Media: FC<MediaProps> = ({
  controls,
  className,
  audio,
  audioPlay,
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
      if (audio && audioPlay) {
        const stream = new MediaStream();
        stream.addTrack(audio);
        audioRef.current.srcObject = stream;
      } else {
        audioRef.current.srcObject = null;
      }
    }
  }, [audio, audioPlay]);

  return (
    <Container className={className}>
      <Controls>{controls}</Controls>
      <div>
        <video autoPlay playsInline ref={videoRef} style={{ width: "100%" }} />
        <audio autoPlay playsInline ref={audioRef} />
      </div>
      <Effect>
        <VADetector track={audio} />
      </Effect>
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

const Effect = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
