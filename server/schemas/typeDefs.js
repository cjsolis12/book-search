const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
_id: ID
username: String 
email: String 
bookCount: Int
password: String 
savedBooks: [Book]
}

type Book {
bookId: ID
authors: [String]
description: String!
image: String 
link: String 
title: String!
}

input BookInput {
  authors: [String]
  description: String!
  bookId: ID
  image: String 
  link: String 
  title: String!
}

type Query {
me: User
}

type Auth{
token: String
user: User
}

type Mutation {
addUser(username: String, email:String, password: String): Auth 
login(email:String, password:String): Auth
saveBook(input:BookInput):User
removeBook(bookId:ID):User
}
`

module.exports = typeDefs;