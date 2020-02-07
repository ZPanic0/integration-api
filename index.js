import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import path from 'path'
import { config } from 'dotenv'
import typeDefs from './schema'
import resolvers from './resolvers'
import request from 'request'

config()
const port = process.env.PORT
const authUrl =
  'https://app.hubspot.com/oauth/authorize' +
  `?client_id=${encodeURIComponent(process.env.HUBSPOT_OAUTH_CLIENT_ID)}` +
  `&scope=${encodeURIComponent(process.env.HUBSPOT_OAUTH_SCOPE)}` +
  `&redirect_uri=${encodeURIComponent(process.env.HUBSPOT_OAUTH_REDIRECT_URI)}`;

const app = express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'client/build')))
  .post('/webhooks/hubspot', (req, res) => {
    console.log("webhooks/hubspot hit")
    console.log(req.body)
    res.sendStatus(200)
  })
  .get('/oauth/hubspot', (req, res) => {
    console.log('hit oauth get for hubspot')
    res.redirect(authUrl)
  })
  .get('/oauth/hubspot/callback', async (req, res) => {
    if (req.query && req.query.code) {
      const formData = {
        form: {
          grant_type: 'authorization_code',
          client_id: process.env.HUBSPOT_OAUTH_CLIENT_ID,
          client_secret: process.env.HUBSPOT_OAUTH_CLIENT_SECRET,
          redirect_uri: process.env.HUBSPOT_OAUTH_REDIRECT_URI,
          code: req.query.code
        }
      }

      request.post('https://api.hubapi.com/oauth/v1/token', formData, (_, __, body) => res.send(body))
    }
  })

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port }, () => console.log(`Server ready at ${process.env.URL}${port}${server.graphqlPath}`))