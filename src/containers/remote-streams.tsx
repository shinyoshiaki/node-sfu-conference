import { FunctionComponent } from "react";
import { css } from "@emotion/css";
import { rightMenuWidth, rightMenuTogglerHeight } from "../util/style";
import RemoteStreamLayout from "./remote-stream";
import { useDispatch, useSelector } from "react-redux";
import { setPinnedMedia } from "../redux/remote";
import { MediaInfo } from "@shinyoshiaki/node-sfu-client";
import { useManager } from "../context/context";

export const RemoteStreams: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { users, pinnedMedia } = useSelector(({ remote }) => remote);
  const manager = useManager();

  const onClickSetPinned = (info: MediaInfo) => {
    if (info.kind === "audio") return;

    const isPinned = pinnedMedia?.mediaId === info.mediaId;
    if (isPinned) {
      dispatch(setPinnedMedia(undefined));
      manager.changeQuality(info, "low");
    } else {
      dispatch(setPinnedMedia(info));
      manager.changeQuality(info, "high");
    }
  };

  return (
    <div className={wrapperStyle}>
      <div className={headStyle}>
        <span className={numberStyle}>{Object.keys(users).length}</span>
        participant(s)
      </div>
      {Object.values(users)
        .filter((user) => Object.values(user.medias).length > 0)
        .map((user) =>
          Object.values(user.medias).map((media) => {
            return (
              <RemoteStreamLayout
                key={media.info.mediaId}
                displayName={user.peerId}
                stream={media.stream}
                isPinned={false}
                info={media.info}
                onClickSetPinned={onClickSetPinned}
              />
            );
          })
        )
        .flatMap((v) => v)}
    </div>
  );
};

export default RemoteStreams;

const wrapperStyle = css({
  width: rightMenuWidth,
});

const headStyle = css({
  height: rightMenuTogglerHeight,
  padding: 4,
  boxSizing: "border-box",
  fontSize: ".8rem",
  textAlign: "center",
});

const numberStyle = css({
  fontSize: ".9rem",
  fontWeight: "bold",
});
