import styled from "@emotion/styled";

import { FC } from "react";
import { useSelector } from "react-redux";
import { RemoteMedia } from "./remoteMedia";

export const RemoteMediaList: FC<{ className?: string }> = ({ className }) => {
  const users = useSelector(({ remote }) => remote.users);

  return (
    <List className={className}>
      {Object.values(users)
        .filter((user) => Object.values(user.medias).length > 0)
        .map((user, i) => (
          <RemoteMedia user={user} key={i} />
        ))}
    </List>
  );
};

const List = styled.div`
  width: fit-content;
  @media (max-width: 420px) {
    width: 100%;
  }
  overflow-y: auto;
  overflow-x: hidden;
`;
