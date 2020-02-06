import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import path from 'path'
import { config } from 'dotenv'
import typeDefs from './schema'
import resolvers from './resolvers'

config()
const port = process.env.PORT

const app = express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'client/build')))
  .post('/webhooks/hubspot', (req, res) => {
    console.log("webhooks/hubspot hit")
    console.log(req.body)
    res.sendStatus(200)
  })

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port }, () => console.log(`Server ready at ${process.env.URL}${port}${server.graphqlPath}`))