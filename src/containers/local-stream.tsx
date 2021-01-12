import { useContext, useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/css";
import StreamController from "../components/stream-controller";
import Video from "../components/video";
import { IconButton } from "../components/icon";
import VADetector from "../components/va-detector";
import { globalColors } from "../util/global-style";
import { useDispatch, useSelector } from "react-redux";
import {
  getDisplayVideoTrack,
  getUserAudioTrack,
  getUserVideoTrack,
} from "../domain/media";
import { Context } from "../context/context";
import { setAudio, setAudioInfo, setCam, setCamInfo } from "../redux/local";

const LocalStream: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [isMinimize, setMinimize] = useState(false);

  const local = useSelector(({ local }) => local);
  const { rtc } = useContext(Context);

  const stream = new MediaStream();
  if (local.camTrack) stream.addTrack(local.camTrack);
  if (local.audioTrack) stream.addTrack(local.audioTrack);

  const onClickToggleMeshAudio = async () => {
    if (local.audioTrack && local.audioInfo) {
      dispatch(setAudio({}));
      rtc.unPublish(local.audioInfo);
    } else {
      const audio = await getUserAudioTrack();
      const info = await rtc.publish({ track: audio });
      dispatch(setAudio({ audio }));
      dispatch(setAudioInfo({ info }));
    }
  };
  const onClickToggleMeshVideo = async () => {
    if (local.camTrack && local.camInfo) {
      dispatch(setCam({}));
      rtc.unPublish(local.camInfo);
    } else {
      const cam = await getUserVideoTrack();
      const info = await rtc.publish({ track: cam });
      dispatch(setCam({ cam }));
      dispatch(setCamInfo({ info }));
    }
  };
  const onClickToggleMeshDisplay = async () => {
    if (local.displayTrack) {
      // await rtc.unPublishMedia(local.displayTopic!);
      // dispatch(setTrack(["display", undefined]));
    } else {
      const track = await getDisplayVideoTrack();
      // const topic = await rtc.publishMedia(track, "display");
      // dispatch(setTopic(["display", topic]));
      // dispatch(setTrack(["display", track]));
    }
  };
  const onClickCastVideo = () => {};

  return (
    <div
      className={isMinimize ? wrapperStyle + " " + minimizeStyle : wrapperStyle}
    >
      <div className={videoStyle}>
        <Video stream={stream} isVideoOnly={true} />
        <div className={actionStyle}>
          <IconButton
            name="cast"
            showEdge={true}
            title="Cast your video"
            onClick={onClickCastVideo}
          />
          {isMinimize ? (
            <IconButton
              name="keyboard_arrow_right"
              showEdge={true}
              title="Maximize"
              onClick={() => setMinimize(false)}
            />
          ) : (
            <IconButton
              name="keyboard_arrow_left"
              showEdge={true}
              title="Minimize"
              onClick={() => setMinimize(true)}
            />
          )}
        </div>
        <div className={controllerStyle}>
          <VADetector stream={stream} />
          <StreamController
            displayName={""}
            controllers={
              <>
                <IconButton
                  name={
                    !local.displayTrack ? "stop_screen_share" : "screen_share"
                  }
                  title={
                    !local.displayTrack
                      ? "Publish display"
                      : "UnPublish display"
                  }
                  onClick={onClickToggleMeshDisplay}
                />
                <IconButton
                  name={!local.camTrack ? "videocam_off" : "videocam"}
                  title={!local.camTrack ? "Publish video" : "UnPublish video"}
                  onClick={onClickToggleMeshVideo}
                />
                <IconButton
                  name={!local.audioTrack ? "mic_off" : "mic"}
                  title={
                    !local.audioTrack ? "Publish audio" : "UnPublish audio"
                  }
                  onClick={onClickToggleMeshAudio}
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LocalStream;

const wrapperStyle = css({
  outline: `1px solid ${globalColors.gray}`,
  transition: "all .2s ease",
  willChange: "transform",
});

const minimizeStyle = css({
  transform: "translateX(-85%)",
});

const localStreamWidth = 240;
const videoStyle = css({
  position: "relative",
  width: localStreamWidth,
  height: (localStreamWidth / 4) * 3,
  backgroundColor: globalColors.black,
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
