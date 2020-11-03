import styled from "@emotion/styled";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconSwitch } from "../components/iconSwitch";
import { Media } from "../components/media";
import { setAudio, setCam } from "../redux/local";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

export const LocalMedia: FC = () => {
  const dispatch = useDispatch();

  const cam = useSelector(({ local }) => local.camTrack);
  const audio = useSelector(({ local }) => local.audioTrack);

  const onSwitchCam = async (state: boolean) => {
    if (state) {
      const media = await navigator.mediaDevices.getUserMedia({ video: true });
      dispatch(setCam({ cam: media.getVideoTracks()[0] }));
    } else {
      dispatch(setCam({}));
    }
  };

  const onSwitchMic = async (state: boolean) => {
    if (state) {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      dispatch(setAudio({ audio: media.getAudioTracks()[0] }));
    } else {
      dispatch(setAudio({}));
    }
  };

  return (
    <StyledMedia
      video={cam}
      audio={audio}
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
    width: calc(250px - 40px);
    height: calc(190px - 40px);
  }
`;

const StyledIconSwitch = styled(IconSwitch)`
  width: 25px;
`;
