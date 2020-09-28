import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

const GRAPHQL_ENDPOINT = process.env.REACT_APP_ENDPOINT;
// const GRAPHQL_ENDPOINT = "https://graphql-upload-api.herokuapp.com/graphql";

const uploadLink = createUploadLink({
    uri: GRAPHQL_ENDPOINT,
});

export const Config = new ApolloClient({
    link: uploadLink,

    cache: new InMemoryCache(),
});
