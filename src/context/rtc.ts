import { ClientSDK } from "@shinyoshiaki/node-sfu-client";
import { Dispatch } from "redux";
import { addMedia, removeMedia } from "../redux/remote";

export class RTCContext extends ClientSDK {
  listen(dispatch: Dispatch) {
    this.onPublish.subscribe((info) => {
      if (info.publisherId !== this.peerId) {
        this.subscribe([info]);
      }
    });
    this.onTrack.subscribe((stream, info) => {
      dispatch(addMedia({ stream, info }));
      stream.onremovetrack = () => {
        console.warn("onremove", info);
        dispatch(removeMedia({ info }));
      };
    });
  }
}
