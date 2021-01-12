import Layout from "antd/lib/layout/layout";
import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import LeftBottom from "../components/left-bottom";
import RightMenu from "../components/right-menu";
import LocalStream from "../containers/local-stream";
import RemoteStreams from "../containers/remote-streams";
import { useManager } from "../context/context";
import { useStartup } from "../domain/startup";

export const App: FC = () => {
  const dispatch = useDispatch();
  const rtc = useManager();

  const lock = useStartup(dispatch, rtc);

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
