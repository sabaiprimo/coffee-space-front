import { gql } from 'apollo-server-express';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $password: String
    $firstName: String!
    $lastName: String!
    $displayName: String
  ) {
    register(email: $email, password: $password, firstName: $firstName, lastName: $lastName, $displayName: $$displayName){
      _id
      email
      token
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($email: String) {
    user(email: $email) {
      firstName
      lastName
      displayName
      pictureProfile
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $displayName: String
    $pictureProfile: String
  ) {
    modifyUser(firstName: $firstName, lastName: $lastName, $displayName: $$displayName, pictureProfile:$pictureProfile){
      email
      token
    }
  }
`;
