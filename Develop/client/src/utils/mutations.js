import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
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
  mutation LoginUser($usernameOrEmail: String!, $password: String!) {
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
  mutation SaveBook($input: BookInput!) {
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

export const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: ID!) {
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



