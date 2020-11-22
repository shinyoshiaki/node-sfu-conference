import styled from "@emotion/styled";
import { Divider } from "antd";
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
      <Users>
        <Divider orientation="left" plain>
          Me
        </Divider>
        <div>{lock ? <p>loading</p> : <LocalMedia />}</div>
        <Divider orientation="left" plain>
          Participants
        </Divider>
        <StyledRemoteMediaList />
      </Users>
    </Container>
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
