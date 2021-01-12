import { useState } from "react";
import { Dispatch } from "redux";
import { RTCContext } from "../context/rtc";
import { setAudio, setAudioInfo, setCam, setCamInfo } from "../redux/local";
import { useAsyncEffect } from "../util/hooks";

export function useStartup(dispatch: Dispatch, rtc: RTCContext) {
  const [lock, setLock] = useState(true);

  useAsyncEffect(async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const [cam] = media.getVideoTracks();
    dispatch(setCam({ cam }));
    const [audio] = media.getAudioTracks();
    dispatch(setAudio({ audio }));

    const rtc = await join();
    rtc.listen(dispatch);

    const audioInfo = await rtc.publish({ track: audio });
    dispatch(setAudioInfo({ info: audioInfo }));
    const camInfo = await rtc.publish({ track: cam, simulcast: true });
    dispatch(setCamInfo({ info: camInfo }));

    const infos = (await rtc.getMedias()).filter(
      (info) => info.publisherId !== rtc.peerId
    );
    await rtc.subscribe(infos);

    setLock(false);
  }, [dispatch]);

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

  return lock;
}
