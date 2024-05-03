const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('../server/schemas');
const connectDB = require('./connection');

const PORT = process.env.PORT || 3002;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  server.applyMiddleware({ app, path: '/graphql' });
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }
  
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
