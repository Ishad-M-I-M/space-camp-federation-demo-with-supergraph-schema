const { ApolloServer } = require("@apollo/server");
const{ startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { readFileSync } = require('fs');

const port = 4000;

const gateway = new ApolloGateway({
  supergraphSdl: readFileSync("./supergraph.graphql").toString()
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

startStandaloneServer(server,{
    listen : {port: port}
}).then(({url})=>{
    console.log(`🚀  Server ready at ${url}`);
});
