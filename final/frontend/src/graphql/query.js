import { gql } from '@apollo/client';

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

export { ACCOUNT_QUERY, CARDS_QUERY };
