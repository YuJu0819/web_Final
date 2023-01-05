import { gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $account: String!
    $password: String!
    $name: String!
  ) {
    createAccount(account: $account, password: $password, name: $name) {
      account
      password
      name
      winlose
      character
      roomnumber
    }
  }
`;
// account
//       password
//       name
//       winlose
//       character
//       roomnumber
const SIGN_IN_MUTATION = gql`
  mutation signAccount($account: String!, $password: String!) {
    signAccount(account: $account, password: $password) {
      account
      password
      name
      winlose
      character
      roomnumber
    }
  }
`;

const SELECTING_CHARACTER_MUTATION = gql`
  mutation selectCharacter($character: String!, $account: String!) {
    selectCharacter(character: $character, account: $account) {
      account
      password
      name
      winlose
      character
      roomnumber
    }
  }
`;

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($id: String!, $user: gameUser) {
    createRoom(id: $id, user: $user) {
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

const ADD_ROOM_TO_USER = gql`
  mutation addRoomToUser($roomID: String!, $userAccount: String!) {
    addRoomToUser(roomID: $roomID, userAccount: $userAccount) {
      account
      password
      name
      winlose
      character
      roomnumber
    }
  }
`;

const ADD_USER_TO_ROOM = gql`
  mutation addUserToRoom($roomID: String!, $userAccount: String!) {
    addUserToRoom(roomID: $roomID, userAccount: $userAccount) {
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

const PLACE_CARD = gql`
  mutation placeCard(
    $roomID: String!
    $userNum: Int!
    $id: Int!
    $rotate: Int!
    $pos: [Int]
    $ifSkill: Boolean!
  ) {
    placeCard(
      roomID: $roomID
      userNum: $userNum
      id: $id
      rotate: $rotate
      pos: $pos
      ifSkill: $ifSkill
    ) {
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
const DELETE_ROOM_MUTATION = gql`
  mutation deleteRoom($roomID: String!) {
    deleteRoom(roomID: $roomID) {
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
export {
  CREATE_ACCOUNT_MUTATION,
  SIGN_IN_MUTATION,
  SELECTING_CHARACTER_MUTATION,
  CREATE_ROOM_MUTATION,
  ADD_ROOM_TO_USER,
  ADD_USER_TO_ROOM,
  PLACE_CARD,
  DELETE_ROOM_MUTATION,
};
