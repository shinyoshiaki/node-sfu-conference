import styled from "@emotion/styled";
import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { LocalMedia } from "../containers/localMedia";
import { RemoteMediaList } from "../containers/remoteMediaList";
import { Context } from "../context/context";
import { useStartup } from "../domain/startup";

export const App: FC = () => {
  const dispatch = useDispatch();
  const context = useContext(Context);

  const lock = useStartup(dispatch, context);

  return (
    <Container>
      <WrapLocalMedia>{lock ? <p>loading</p> : <LocalMedia />}</WrapLocalMedia>
      <RemoteMediaList />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 98vh;
`;

const WrapLocalMedia = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;
