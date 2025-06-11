const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors'); // ✅ Import CORS
const fs = require('fs');
const path = require('path');
const auth = require('./gql/middleware/auth');
const resolvers = require('./gql/resolvers/resolver');

// ✅ Load schema.graphql as string
const typeDefs = fs.readFileSync(
  path.join(__dirname, './gql/schema/schema.graphql'),
  'utf8'
);

const app = express();

// ✅ Apply CORS middleware (allow React frontend on localhost:3000)
const corsOptions = {
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'], // allow your frontend + Apollo Studio
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Apply custom auth middleware (inject req.user)
app.use(auth);

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      userId: req.user?.id,
      role: req.user?.role,
    }),
  });

  await server.start(); // ✅ Await server start
  server.applyMiddleware({ app, cors: false }); // Disable Apollo's own CORS (handled above)

  // ✅ Start express server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer(); // ✅ Run the server startup
