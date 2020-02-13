import moment from 'moment'
import fetch from 'node-fetch'
import { logEndpoint } from './utilities'
import env from '../utilities/envInit'
import client from '../utilities/mongoClient'

const authUrl =
    'https://app.hubspot.com/oauth/authorize' +
    `?client_id=${encodeURIComponent(env.HUBSPOT_OAUTH_CLIENT_ID)}` +
    `&scope=${encodeURIComponent(env.HUBSPOT_OAUTH_SCOPE)}` +
    `&redirect_uri=${encodeURIComponent(env.HUBSPOT_OAUTH_REDIRECT_URI)}`;

// /webhooks/hubspot
export async function postHubspotWebhook(req, res) {
    logEndpoint('/webhooks/hubspot')

    console.log(req.body)
    res.sendStatus(200)
}

// /oauth/hubspot
export async function requestHubspotOauth(req, res) {
    logEndpoint('/oauth/hubspot')

    res.redirect(authUrl)
}

// /oauth/hubspot/callback
export async function hubspotOauthCallback(req, res) {
    logEndpoint('/oauth/hubspot/callback')
    if (!(req.query && req.query.code)) return res.sendStatus(400);
    const requestedAt = moment()
    try {
        const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: env.HUBSPOT_OAUTH_CLIENT_ID,
                client_secret: env.HUBSPOT_OAUTH_CLIENT_SECRET,
                redirect_uri: env.HUBSPOT_OAUTH_REDIRECT_URI,
                code: req.query.code
            }).toString()
        })

        const responseData = await response.json()
        await client.setOAuthCredentials('default', {
            hubspot: {
                expiresAt: requestedAt.add(responseData.expires_in, 'seconds').format(),
                refreshToken: responseData.refresh_token,
                accessToken: responseData.access_token
            }
        }) //TODO: add identity logic
        return res.redirect('/')
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}