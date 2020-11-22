import styled from "@emotion/styled";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { IconSwitch } from "../components/iconSwitch";
import { Media } from "../components/media";
import { disableMedia, enableMedia, User } from "../redux/remote";

export const RemoteMedia: FC<{ user: User }> = ({ user }) => {
  const dispatch = useDispatch();
  const medias = Object.values(user.medias);

  const video = medias.find((media) => media.info.kind === "video");
  const audio = medias.find((media) => media.info.kind === "audio");

  const onSwitchCam = (enable: boolean) => {
    if (!video) return;
    if (enable) {
      dispatch(enableMedia({ info: video.info }));
    } else {
      dispatch(disableMedia({ info: video.info }));
    }
  };

  const onSwitchMic = (enable: boolean) => {
    if (!audio) return;
    if (enable) {
      dispatch(enableMedia({ info: audio.info }));
    } else {
      dispatch(disableMedia({ info: audio.info }));
    }
  };

  return (
    <StyledMedia
      video={video?.play ? video?.stream.getTracks()[0] : undefined}
      audio={audio?.play ? audio?.stream.getTracks()[0] : undefined}
      audioPlay={true}
      controls={
        <div style={{ display: "flex" }}>
          <StyledIconSwitch
            initial={true}
            active={<FontAwesomeIcon icon={faVideo} />}
            inactive={<FontAwesomeIcon icon={faVideoSlash} />}
            onClick={onSwitchCam}
          />
          <StyledIconSwitch
            initial={true}
            active={<FontAwesomeIcon icon={faMicrophone} />}
            inactive={<FontAwesomeIcon icon={faMicrophoneSlash} />}
            onClick={onSwitchMic}
          />
        </div>
      }
    />
  );
};

const StyledMedia = styled(Media)`
  width: 250px;
  height: 190px;
  @media (max-width: 420px) {
    width: 100%;
    height: auto;
  }
`;

const StyledIconSwitch = styled(IconSwitch)`
  width: 25px;
`;
