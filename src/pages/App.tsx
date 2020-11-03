import styled from "@emotion/styled";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { LocalMedia } from "../containers/localMedia";
import { useStartup } from "../domain/startup";

export const App: FC = () => {
  const dispatch = useDispatch();

  const lock = useStartup(dispatch);

  return (
    <Container>
      <WrapLocalMedia>{lock ? <p>loading</p> : <LocalMedia />}</WrapLocalMedia>
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
