import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaInfo } from "@shinyoshiaki/node-sfu-client";

export type RemoteState = {
  peer?: RTCPeerConnection;
  users: { [peerId: string]: User };
};

export type User = {
  medias: {
    [mediaId: string]: { info: MediaInfo; stream: MediaStream; play: boolean };
  };
};

const initialState: RemoteState = { users: {} };

const module = createSlice({
  name: "remote",
  initialState,
  reducers: {
    addMedia: (
      state,
      {
        payload: { stream, info },
      }: PayloadAction<{ stream: MediaStream; info: MediaInfo }>
    ) => {
      if (!state.users[info.publisherId])
        state.users[info.publisherId] = { medias: {} };

      const play = true;

      state.users[info.publisherId].medias[info.mediaId] = {
        info,
        stream,
        play,
      };
    },
    removeMedia: (
      state,
      { payload: { info } }: PayloadAction<{ info: MediaInfo }>
    ) => {
      const medias = state.users[info.publisherId].medias;
      delete medias[info.mediaId];
      state.users[info.publisherId].medias = medias;
    },
    enableMedia: (
      state,
      { payload: { info } }: PayloadAction<{ info: MediaInfo }>
    ) => {
      state.users[info.publisherId].medias[info.mediaId].play = true;
    },
    disableMedia: (
      state,
      { payload: { info } }: PayloadAction<{ info: MediaInfo }>
    ) => {
      state.users[info.publisherId].medias[info.mediaId].play = false;
    },
  },
});

export default module.reducer;

export const {
  addMedia,
  enableMedia,
  disableMedia,
  removeMedia,
} = module.actions;
