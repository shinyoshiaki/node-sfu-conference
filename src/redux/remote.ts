import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RemoteState = {
  peer?: RTCPeerConnection;
  users: User[];
};

export type User = { stream: MediaStream; info: any };

const initialState: RemoteState = { users: [] };

const module = createSlice({
  name: "remote",
  initialState,
  reducers: {},
});

export default module.reducer;

export const {} = module.actions;
