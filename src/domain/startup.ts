import { useState } from "react";
import { Dispatch } from "redux";
import { setAudio, setCam } from "../redux/local";
import { useAsyncEffect } from "../util/hooks";

export function useStartup(dispatch: Dispatch) {
  const [lock, setLock] = useState(true);

  useAsyncEffect(async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const cam = media.getVideoTracks()[0];
    dispatch(setCam({ cam }));
    const audio = media.getAudioTracks()[0];
    dispatch(setAudio({ audio }));

    setLock(false);
  }, [dispatch]);

  return lock;
}
