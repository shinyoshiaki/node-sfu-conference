import { Dispatch } from "redux";
import { setAudio, setCam } from "../redux/local";

export async function startup(dispatch: Dispatch) {
  const media = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const cam = media.getVideoTracks()[0];
  dispatch(setCam({ cam }));
  const audio = media.getAudioTracks()[0];
  dispatch(setAudio({ audio }));
}
