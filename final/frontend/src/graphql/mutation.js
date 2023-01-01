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
  mutation createRoom($id: Int!, $user: gameUser) {
    createRoom(id: $id, user: $user) {
      id
      turn
      map
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

export {
  CREATE_ACCOUNT_MUTATION,
  SIGN_IN_MUTATION,
  SELECTING_CHARACTER_MUTATION,
  CREATE_ROOM_MUTATION,
};
