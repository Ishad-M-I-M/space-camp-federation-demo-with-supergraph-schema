const { ApolloServer} = require("@apollo/server");
const{ startStandaloneServer } = require('@apollo/server/standalone');
const {gql} = require("graphql-tag");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const port = 4002;
const apiUrl = "http://localhost:3000";

const typeDefs = gql`
  type Mission {
    id: ID!
    crew: [Astronaut]
    designation: String!
    startDate: String
    endDate: String
  }

  extend type Astronaut @key(fields: "id") {
    id: ID! @external
    missions: [Mission]
  }

  extend type Query {
    mission(id: ID!): Mission
    missions: [Mission]
  }
`;

const resolvers = {
  Astronaut: {
    async missions(astronaut) {
      const res = await fetch(`${apiUrl}/missions`);
      const missions = await res.json();

      return missions.filter(({ crew }) =>
        crew.includes(parseInt(astronaut.id))
      );
    }
  },
  Mission: {
    crew(mission) {
      return mission.crew.map(id => ({ __typename: "Astronaut", id }));
    }
  },
  Query: {
    mission(_, { id }) {
      return fetch(`${apiUrl}/missions/${id}`).then(res => res.json());
    },
    missions() {
      return fetch(`${apiUrl}/missions`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

startStandaloneServer(server,{
    listen : {port: port}
}).then(({url})=>{
    console.log(`🚀  Server ready at ${url}`);
});