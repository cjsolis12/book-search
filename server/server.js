const express = require('express');
const { ApolloServer } = require ('apollo-server-express')
const path = require('path');
const db = require('./config/connection');

const dotenv = require('dotenv');
dotenv.config();


const { typeDefs, resolvers } = require ('./schemas');
const { authMiddleware } = require('./utils/auth');

//Initiate a new instance of the apollo server class
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//function that connects apollo and express and starts the server
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app })
  
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log( `use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  });
});
}


startApolloServer();