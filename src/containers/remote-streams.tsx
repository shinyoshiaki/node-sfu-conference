import { FunctionComponent } from "react";
import { css } from "@emotion/css";
import { rightMenuWidth, rightMenuTogglerHeight } from "../util/style";
import RemoteStreamLayout from "../components/remote-stream-layout";
import { useDispatch, useSelector } from "react-redux";
// import { setPinnedTopic } from "../redux/remote";

export const RemoteStreams: FunctionComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ remote }) => remote.users);

  const onClickSetPinned = (topicId: string) => {
    // const isPinned = remote.pinnedTopic?.id === topicId;
    // if (isPinned) {
    //   dispatch(setPinnedTopic(undefined));
    // } else {
    //   const topic = remote.topics[topicId];
    //   dispatch(setPinnedTopic(topic));
    // }
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
                onClickSetPinned={() => {}}
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
