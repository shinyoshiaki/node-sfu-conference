export const getUserAudioTrack = async (): Promise<MediaStreamTrack> => {
  return navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => stream.getAudioTracks()[0]);
};

export const getUserVideoTrack = async (): Promise<MediaStreamTrack> => {
  return navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => stream.getVideoTracks()[0]);
};

export const getDisplayVideoTrack = async (): Promise<MediaStreamTrack> => {
  return (navigator.mediaDevices as any)
    .getDisplayMedia({ video: true })
    .then((stream: any) => stream.getVideoTracks()[0]);
};
