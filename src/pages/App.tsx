import styled from "@emotion/styled";
import React, { FC, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LocalMedia } from "../containers/localMedia";
import { startup } from "../domain/startup";

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    startup(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <StyledLocalMedia />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 98vh;
`;

const StyledLocalMedia = styled(LocalMedia)`
  position: absolute;
  left: 0;
  bottom: 0;
`;
