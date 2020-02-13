import { MongoClient } from 'mongodb'
import env from './envInit'

const mongoClient = MongoClient(env.MONGODB_URI, { useUnifiedTopology: true })
mongoClient
    .connect()
    .then(() => console.log("MongoDB connected."))
    .catch(err => {
        console.log("MongoDB connect failed.")
        console.log(err)
    })

async function getOAuthCredentials(identity) {
    return await mongoClient
        .db(env.DB_NAME)
        .collection('oauth-credentials')
        .findOne({ identity })
}

async function setOAuthCredentials(identity, newCredentials) {
    return await mongoClient
        .db(env.DB_NAME)
        .collection('oauth-credentials')
        .updateOne({ identity }, { $set: newCredentials }, { upsert: true })
}

const client = {
    mongoClient: mongoClient,
    getOAuthCredentials,
    setOAuthCredentials
}

export default client