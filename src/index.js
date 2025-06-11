import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';
import { BrowserRouter } from 'react-router-dom'; // Use 'react-router-dom' for BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ GraphQL Schema (typeDefs)
const typeDefs = `
  type User {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subject: String!
    attendance: String!
  }

  type Query {
    user(id: ID!): User
  }
`;

// ✅ Create mock schema
const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({ schema });

// ✅ Example GraphQL query
const query = `
  query GetEmployee($getEmployeeId: ID!) {
    getEmployee(id: $getEmployeeId) {
      id
      name
    }
  }
`;

// ✅ Execute mocked GraphQL query
graphql({
  schema: schemaWithMocks,
  source: query
}).then(result => {
  console.log('Mocked GraphQL Result:', result.data);
});

// ✅ Apollo Client setup for real API (if used)
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Ensure the correct path to /graphql
  cache: new InMemoryCache(),
});

// ✅ React App render
root.render(
  <React.StrictMode>
    {/* Comment or uncomment below depending on real API or mock usage */}
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
