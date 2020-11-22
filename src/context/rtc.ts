import { ClientSDK } from "@shinyoshiaki/node-sfu-client";
import { Dispatch } from "redux";

export class RTCContext extends ClientSDK {
  listen(dispatch: Dispatch) {
    this.onPublish.subscribe((info) => {
      if (info.publisherId !== this.peerId) {
        this.subscribe([info]);
      }
    });
    this.onTrack.subscribe((stream, info) => {});
  }
}
