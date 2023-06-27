import { gql } from '@apollo/client';

export const GET_ME = gql`
  query user($id: ID, $username:String) {
    user(id: $id, username: $username) {
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