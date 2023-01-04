import { gql } from '@apollo/client';

const USERS_IN_ROOM_SUBSCRIPTION = gql`
  subscription usersInRoom($roomId: String!) {
    usersInRoom(roomId: $roomId)
  }
`;

const ROOM_UPDATE_SUBSCRIPTION = gql`
  subscription RoomUpdate($roomId: String!) {
    RoomUpdate(roomId: $roomId){
      id
      turn
      map {
        row
      }
      timer
      users {
        account
        character
        handcard
        score
        used {
          cardid
          rotate
          position
        }
      }
    }
  }
`;

export { USERS_IN_ROOM_SUBSCRIPTION, ROOM_UPDATE_SUBSCRIPTION };
