import request from 'request'
import { logEndpoint } from './utilities'
import env from '../envInit'

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

    if (req.query && req.query.code) {
        const formData = {
            form: {
                grant_type: 'authorization_code',
                client_id: env.HUBSPOT_OAUTH_CLIENT_ID,
                client_secret: env.HUBSPOT_OAUTH_CLIENT_SECRET,
                redirect_uri: env.HUBSPOT_OAUTH_REDIRECT_URI,
                code: req.query.code
            }
        }

        request.post('https://api.hubapi.com/oauth/v1/token', formData, (_, __, body) => res.send(body))
    }
}