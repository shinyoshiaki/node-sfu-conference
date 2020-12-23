import { useState } from "react";
import { Dispatch } from "redux";
import { setAudio, setCam } from "../redux/local";
import { useAsyncEffect } from "../util/hooks";
import { ContextProps } from "../context/context";

export function useStartup(dispatch: Dispatch, { rtc }: ContextProps) {
  const [lock, setLock] = useState(true);

  useAsyncEffect(async () => {
    const { cam, audio } = await gUM();
    const rtc = await join();
    rtc.listen(dispatch);

    await publish([cam, audio]);

    const infos = (await rtc.getMedias()).filter(
      (info) => info.publisherId !== rtc.peerId
    );
    await rtc.subscribe(infos);

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

    return { cam, audio };
  }

  async function join() {
    const params = new URLSearchParams(window.location.hash.split("#")[1]);

    if (!params.has("room")) {
      await rtc.apiCreate();
      window.location.hash = `?room=${rtc.roomName}`;
    } else {
      rtc.roomName = params.get("room")!;
    }

    await rtc.apiJoin();
    return rtc;
  }

  async function publish([video, audio]: MediaStreamTrack[]) {
    await rtc.publish({ track: audio });
    await rtc.publish({ track: video, simulcast: true });
  }

  return lock;
}
