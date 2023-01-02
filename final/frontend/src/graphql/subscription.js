import { gql } from "@apollo/client";

const GAME_SUBSCRIPTION = gql`
  subscription gameStart($roomID: String!, $user1: String!) {
    gameStart(roomID: $roomID, user1: $user1) {
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
      }
    }
  }
`;

export { GAME_SUBSCRIPTION };
