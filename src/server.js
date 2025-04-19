const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const Score = require('./models/score');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startServer() {
  // Initialize Express
  const app = express();
  
  // Apply CORS middleware
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  }));

  // Initialize Database
  try {
    await Score.sequelize.sync();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    formatError: (error) => {
      return {
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR'
      };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/api' });

  // Start server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();