import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Video } from "../components/video";

export const PinnedStream: FunctionComponent<{}> = () => {
  const { users, pinnedMedia } = useSelector(({ remote }) => remote);

  const user = users[pinnedMedia?.publisherId!];
  if (!user) return <div />;

  const content =
    users[pinnedMedia?.publisherId!].medias[pinnedMedia?.mediaId!];
  if (!content) return <div />;

  return <Video stream={content.stream} isVideoOnly={true} />;
};
