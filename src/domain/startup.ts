import { setAudio, setCam } from "../redux/local";

export async function startup() {
  const media = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const cam = media.getVideoTracks()[0];
  setCam({ cam });
  const audio = media.getAudioTracks()[0];
  setAudio({ audio });
}
