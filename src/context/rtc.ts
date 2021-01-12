import { ClientSDK } from "@shinyoshiaki/node-sfu-client";
import { Dispatch } from "redux";
import { addMedia, removeMedia } from "../redux/remote";
import { HttpConnection } from "./http";

export class RTCContext extends ClientSDK {
  private readonly http = new HttpConnection({ url: this.url });
  roomName!: string;

  constructor(private url: string) {
    super();
  }

  listen(dispatch: Dispatch) {
    this.events.onPublish.subscribe((info) => {
      if (info.publisherId !== this.peerId) {
        this.subscribe([info]);
      }
    });
    this.events.onTrack.subscribe((stream, info) => {
      dispatch(addMedia({ stream, info }));
    });
    this.events.onUnPublish.subscribe((info) => {
      dispatch(removeMedia({ info }));
    });
  }

  async apiCreate() {
    this.roomName = await this.http.create();
    return this.roomName;
  }

  async apiJoin() {
    const { offer, peerId } = await this.http.join(this.roomName);
    const { answer, candidates, user } = await this.join(
      this.roomName,
      peerId,
      offer
    );
    user.onCandidate.subscribe((candidate) =>
      this.http.candidate(peerId, this.roomName, candidate as any)
    );
    this.http.answer(peerId, this.roomName, answer as any);
    candidates.forEach((candidate) =>
      this.http.candidate(peerId, this.roomName, candidate as any)
    );
    await this.events.onConnect.asPromise();
  }
}
