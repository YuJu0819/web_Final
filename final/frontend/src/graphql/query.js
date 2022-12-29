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

export { ACCOUNT_QUERY };
