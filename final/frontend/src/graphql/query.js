import { gql } from "@apollo/client";

const ACCOUNT_QUERY = gql`
  query user($account: String!) {
    user(account: $account) {
      account
      password
      name
      winlose
      character
      roomnum
    }
  }
`;
const CARDS_QUERY = gql`
  query cards($character: String!) {
    cards(character: $character)
  }
`;

const ROOM_QUERY = gql`
  query room($id: String!) {
    room(id: $id) {
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

const CARD_QUERY = gql`
  query card($id: Int!) {
    card(id: $id)
  }
`;


export { ACCOUNT_QUERY, CARDS_QUERY, ROOM_QUERY, CARD_QUERY };
