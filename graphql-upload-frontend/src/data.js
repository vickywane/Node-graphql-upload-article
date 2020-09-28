import { gql } from "@apollo/react-hooks";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $image: Upload!) {
    createUser(username: $username, image: $image) {
      username
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteUser
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      username
      imageuri
    }
  }
`;
