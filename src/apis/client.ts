import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const httpLink = createUploadLink({
  uri: ''
})

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: httpLink,
  cache: new InMemoryCache()
})