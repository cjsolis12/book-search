const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
_id: ID
username: String 
email: String 
password: String 
savedBooks: [bookSchema]
}

type Book {
_id: string
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
`

module.exports = typeDefs;