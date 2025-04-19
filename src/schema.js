const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Score {
    id: ID!
    username: String!
    score: Int!
    createdAt: String!
  }

  type Query {
    getLeaderboard(limit: Int = 10): [Score]
  }

  type Mutation {
    submitScore(username: String!, score: Int!): Score
  }
`;

module.exports = typeDefs;