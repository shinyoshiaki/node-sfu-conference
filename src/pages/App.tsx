import Layout from "antd/lib/layout/layout";
import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import Main from "../components/main";
import LeftBottom from "../components/left-bottom";
import RightMenu from "../components/right-menu";
import LocalStream from "../containers/local-stream";
import RemoteStreams from "../containers/remote-streams";
import { useManager } from "../context/context";
import { useStartup } from "../domain/startup";
import { PinnedStream } from "../containers/pinned-stream";

export const App: FC = () => {
  const dispatch = useDispatch();
  const rtc = useManager();

  const lock = useStartup(dispatch, rtc);

  return (
    <Layout>
      <Main>
        <PinnedStream />
      </Main>
      <LeftBottom>
        <LocalStream />
      </LeftBottom>
      <RightMenu openers={[]}>
        <RemoteStreams />
      </RightMenu>
    </Layout>
  );
};
