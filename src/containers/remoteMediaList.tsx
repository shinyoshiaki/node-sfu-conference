import styled from "@emotion/styled";

import { FC } from "react";
import { useSelector } from "react-redux";
import { RemoteMedia } from "./remoteMedia";

export const RemoteMediaList: FC = () => {
  const users = useSelector(({ remote }) => remote.users);

  return (
    <List>
      {Object.values(users)
        .filter((user) => Object.values(user.medias).length > 0)
        .map((user, i) => (
          <RemoteMedia user={user} key={i} />
        ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
