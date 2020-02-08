import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import path from 'path'
import env from './envInit'
import typeDefs from './schema'
import resolvers from './resolvers'
import endpoints from './endpoints'

const port = env.PORT

const app = express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'client/build')))
  .post('/webhooks/hubspot', endpoints.postHubspotWebhook)
  .get('/oauth/hubspot', endpoints.requestHubspotOauth)
  .get('/oauth/hubspot/callback', endpoints.hubspotOauthCallback)

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port }, () => console.log(`Server ready at ${env.URL}${port}${server.graphqlPath}`))