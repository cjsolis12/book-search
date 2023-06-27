import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        image
        link
        title
      }
    }
  }
`;



