import { gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($account: String!, $password: String!) {
    createAccount(account: $account, password: $password) {
      account
      password
      winlose
      character
      roomnumber
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation signAccount($account: String!, $password: String!) {
    signAccount(account: $account, password: $password) {
      account
      password
      winlose
      character
      roomnumber
    }
  }
`;

export { CREATE_ACCOUNT_MUTATION, SIGN_IN_MUTATION };
