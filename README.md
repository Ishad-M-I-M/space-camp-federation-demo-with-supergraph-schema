# Apollo Space Camp Demo Code

**Installation:**

```sh
npm i && npm run server
```

Refactored the https://github.com/Ishad-M-I-M/space-camp-federation-demo-updated to use the pre-composed `supergraph.graphql` as the `supergraphSdl` for the gateway.

The supergraph is formed by composing the [subgraphs](./subgraphs) using the [rover cli](https://www.apollographql.com/docs/rover/getting-started/).