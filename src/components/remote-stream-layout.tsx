import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/css";
import { rightMenuWidth } from "../util/style";
import Video from "./video";
import StreamController from "./stream-controller";
import { Icon, IconButton } from "./icon";
import VADetector from "./va-detector";
import { globalColors } from "../util/global-style";

interface Props {
  stream: MediaStream;
  isPinned: boolean;
  displayName: string;
  onClickSetPinned: () => void;
}
const RemoteStreamLayout: FunctionComponent<Props> = ({
  stream,
  isPinned,
  onClickSetPinned,
  displayName,
}: Props) => {
  const [isInfoShown, setInfoShown] = useState(false);
  const kinds = [...new Set(stream.getTracks().map((track) => track.kind))];

  return (
    <>
      <div className={videoStyle}>
        <Video stream={stream} />
        <div className={actionStyle}>
          {!false ? (
            <IconButton
              name={isPinned ? "cancel_presentation" : "present_to_all"}
              showEdge={true}
              title="Pin this video"
              onClick={onClickSetPinned}
            />
          ) : null}
          <IconButton
            name="info"
            showEdge={true}
            title="Toggle stream info"
            onClick={() => setInfoShown(!isInfoShown)}
          />
        </div>

        <div className={controllerStyle}>
          {true ? (
            <>
              <VADetector stream={stream} />
              <StreamController
                displayName={displayName}
                controllers={
                  <>
                    {kinds.includes("video") && (
                      <Icon name={false ? "videocam_off" : "videocam"} />
                    )}
                    {kinds.includes("audio") && (
                      <Icon name={false ? "mic_off" : "mic"} />
                    )}
                  </>
                }
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default RemoteStreamLayout;

const videoStyle = css({
  position: "relative",
  height: (rightMenuWidth / 4) * 3,
  backgroundColor: globalColors.black,
});

const infoStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 10,
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
});

const actionStyle = css({
  position: "absolute",
  top: 4,
  right: 4,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  color: globalColors.white,
});
