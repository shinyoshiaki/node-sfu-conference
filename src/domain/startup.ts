import { useState } from "react";
import { Dispatch } from "redux";
import { setAudio, setCam } from "../redux/local";
import { useAsyncEffect } from "../util/hooks";
import { ContextProps } from "../context/context";

export function useStartup(dispatch: Dispatch, { rtc }: ContextProps) {
  const [lock, setLock] = useState(true);

  useAsyncEffect(async () => {
    await gUM();
    await join();
    setLock(false);
  }, [dispatch]);

  async function gUM() {
    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const cam = media.getVideoTracks()[0];
    dispatch(setCam({ cam }));
    const audio = media.getAudioTracks()[0];
    dispatch(setAudio({ audio }));
  }

  async function join() {
    const params = new URLSearchParams(window.location.hash.split("#")[1]);

    if (!params.has("room")) {
      await rtc.create();
      window.location.hash = `?room=${rtc.roomName}`;
    } else {
      rtc.roomName = params.get("room")!;
    }

    await rtc.join();
    rtc.listen(dispatch);
  }

  return lock;
}
