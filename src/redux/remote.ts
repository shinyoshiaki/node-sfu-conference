import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaInfo } from "@shinyoshiaki/node-sfu-client";

export type RemoteState = {
  peer?: RTCPeerConnection;
  users: { [peerId: string]: User };
};

export type User = {
  peerId: string;
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
        state.users[info.publisherId] = {
          medias: {},
          peerId: info.publisherId,
        };

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
      const user = state.users[info.publisherId];
      if (!user) return;
      const medias = user.medias;
      delete medias[info.mediaId];
      user.medias = medias;

      if (Object.keys(user.medias).length === 0) {
        delete state.users[info.publisherId];
      }
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
