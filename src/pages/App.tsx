import styled from "@emotion/styled";
import { Divider } from "antd";
import Layout from "antd/lib/layout/layout";
import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import LeftBottom from "../components/left-bottom";
import RightMenu from "../components/right-menu";
import LocalStream from "../containers/local-stream";
import { LocalMedia } from "../containers/localMedia";
import RemoteStreams from "../containers/remote-streams";
import { RemoteMediaList } from "../containers/remoteMediaList";
import { Context } from "../context/context";
import { useStartup } from "../domain/startup";

export const App: FC = () => {
  const dispatch = useDispatch();
  const context = useContext(Context);

  const lock = useStartup(dispatch, context);

  return (
    <Layout>
      <LeftBottom>
        <LocalStream />
      </LeftBottom>
      <RightMenu openers={[]}>
        <RemoteStreams />
      </RightMenu>
    </Layout>
  );
};

const Container = styled.div`
  position: relative;
  height: 98vh;
`;

const Users = styled.div`
  padding: 10px;
  height: 100%;
  width: 250px;
  @media (max-width: 420px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
`;

const StyledRemoteMediaList = styled(RemoteMediaList)`
  flex-grow: 1;
`;
