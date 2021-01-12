import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaInfo } from "@shinyoshiaki/node-sfu-client";

export type LocalState = {
  audioTrack?: MediaStreamTrack;
  audioInfo?: MediaInfo;
  camTrack?: MediaStreamTrack;
  camInfo?: MediaInfo;
  displayTrack?: MediaStreamTrack;
};

const initialState: LocalState = {};

const module = createSlice({
  name: "local",
  initialState,
  reducers: {
    setAudio: (state, action: PayloadAction<{ audio?: MediaStreamTrack }>) => {
      state.audioTrack = action.payload.audio;
    },
    setCam: (state, action: PayloadAction<{ cam?: MediaStreamTrack }>) => {
      state.camTrack = action.payload.cam;
    },
    setAudioInfo: (state, action: PayloadAction<{ info: MediaInfo }>) => {
      state.audioInfo = action.payload.info;
    },
    setCamInfo: (state, action: PayloadAction<{ info: MediaInfo }>) => {
      state.camInfo = action.payload.info;
    },
  },
});

export default module.reducer;

export const { setAudio, setCam, setAudioInfo, setCamInfo } = module.actions;
