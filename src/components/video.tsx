import { useRef, useEffect, memo } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/css";

interface Props {
  stream: MediaStream;
  isReverse?: boolean;
  isVideoOnly?: boolean;
}
export const Video: FunctionComponent<Props> = ({
  stream,
  isReverse = false,
  isVideoOnly = false,
}) => {
  const isNoAudio = stream.getAudioTracks().length === 0;
  const isNoVideo = stream.getVideoTracks().length === 0;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const $video = videoRef.current;
    if (isNoVideo || $video === null) {
      return;
    }

    $video.srcObject !== stream && ($video.srcObject = stream);
    $video.paused && $video.play().catch(() => {});
  }, [isNoVideo, videoRef, stream]);

  useEffect(() => {
    const $audio = audioRef.current;
    if (isNoAudio || isVideoOnly || $audio === null) {
      return;
    }

    $audio.srcObject !== stream && ($audio.srcObject = stream);
    $audio.paused && $audio.play();
  }, [isNoAudio, isVideoOnly, audioRef, stream]);

  return (
    <>
      {isNoVideo ? null : (
        <video className={videoStyle} ref={videoRef} playsInline muted={true} />
      )}
      {isVideoOnly || isNoAudio ? null : (
        <audio className={audioStyle} ref={audioRef} />
      )}
    </>
  );
};

export default Video;

const audioStyle = css({
  display: "none",
});

const videoStyle = css({
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  pointerEvents: "none",
});

const reverseVideoStyle = css({
  transform: "scaleX(-1)",
});
