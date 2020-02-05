import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'

const port = process.env.port || 4000

const app = express()
  .use(express.json())
  .post('/webhooks/hubspot', (req, res) => {
    console.log("webhooks/hubspot hit")
    console.log(req.body)
    res.sendStatus(200)
  })

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port }, () => console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`))