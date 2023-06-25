const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
_id: ID
username: String 
email: String 
password: String 
savedBooks: [Book]
}

type Book {
_id: ID
authors: [String]
description: String!
image: String 
link: String 
title: String!
}

type Query {
users: [User]
books: [Book]
}

type Auth{
token: String
user: User
}

type Query {
user(id:ID, username:String): User
}

type Mutation {
createUser(username: String, email:String, password: String); Auth 
login(usernameOrEmail:String, password:String): Auth
saveBook(input:BookInput):User
deleteBook(bookId:ID):User
}
`

module.exports = typeDefs;