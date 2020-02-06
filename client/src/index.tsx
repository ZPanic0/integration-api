import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.REACT_APP_GQL_URL}`
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

client
  .query({
    query: gql`
      query GetBookTitles {
        books {
          title
        }
      }
    `
  })
  .then(result => console.log(result));