import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LocalState = {
  audioTrack?: MediaStreamTrack;
  camTrack?: MediaStreamTrack;
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
  },
});

export default module.reducer;

export const { setAudio, setCam } = module.actions;
