import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

const GRAPHQL_ENDPOINT = "http://localhost:3000/graphql";
const uploadLink = createUploadLink({
  uri: GRAPHQL_ENDPOINT,
});

export const Config = new ApolloClient({
  link: uploadLink,

  cache: new InMemoryCache(),
});
