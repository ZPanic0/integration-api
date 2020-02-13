import moment from 'moment'
import fetch from 'node-fetch'
import client from './mongoClient'
import env from './envInit'

const cache = {}

async function getToken(identity, type) {
    if (!cache[identity]) {
        cache[identity] = await client.getOAuthCredentials(identity)
    }

    const isExpired = !cache[identity][type].expiresAt || moment(cache[identity][type].expiresAt).isBefore(moment())

    if (isExpired) {
        switch (type) {
            case 'hubspot':
                return await updateHubspotToken(identity, type)
            default:
                throw new Error('Unsupported type passed to keyStore')
        }
    } else {
        return cache[identity][type].accessToken
    }
}

async function updateHubspotToken(identity, type) {
    if (cache[identity][type].refreshToken) {
        const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: env.HUBSPOT_OAUTH_CLIENT_ID,
                client_secret: env.HUBSPOT_OAUTH_CLIENT_SECRET,
                redirect_uri: env.HUBSPOT_OAUTH_REDIRECT_URI,
                refresh_token: cache[identity][type].refreshToken
            }).toString()
        })

        const responseObject = await response.json()
        const update = {
            hubspot: {
                expiresAt: moment().add(responseObject.expires_in, 'second').format(),
                refreshToken: responseObject.refresh_token,
                accessToken: responseObject.access_token
            }
        }

        cache[identity][type] = update.hubspot
        await client.setOAuthCredentials(identity, update)

        return update.accessToken
    } else {
        //TODO: set up to trigger oauth redirect somehow
        console.log('Cache miss on hubspot refresh token')
    }
}

export { getToken }