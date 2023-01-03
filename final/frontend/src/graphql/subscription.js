import { gql } from '@apollo/client';

const USERS_IN_ROOM_SUBSCRIPTION = gql`
  subscription usersInRoom($roomId: String!) {
    usersInRoom(roomId: $roomId)
  }
`;

export { USERS_IN_ROOM_SUBSCRIPTION };
