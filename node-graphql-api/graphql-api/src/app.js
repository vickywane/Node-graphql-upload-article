import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { Query, Mutation } from "./schema/resolvers";

// The GraphQL schema in string form
const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
    imageuri: String!
  }

  type Query { 
    getUser  : User
  }

  type Mutation { 
    createUser ( 
      username : String!
      email : String!
     ) : User

    updateUser (id : Int!)   : User
    deleteUser (id : Int!) : User
   }
`;

// The resolvers
const resolvers = {
  Query: Query,
  Mutation: Mutation,
};

// Put together a schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();
const route = "graphql";

server.applyMiddleware({ app, route });

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphql to run queries!");
});
