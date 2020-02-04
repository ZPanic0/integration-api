# First milestone:
#### Look at HubSpot, SendGrid, Zapier, Mailchimp APIs
- [HubSpot](https://developers.hubspot.com/docs/overview)
- [Mailchimp](https://mailchimp.com/developer/reference/)
- [SendGrid](https://sendgrid.com/docs/API_Reference/index.html)
- [Zapier](https://platform.zapier.com/cli_docs/docs)
#### How to get test account
- HubSpot developer dashboard has a test account dashboard. See HubSpot notes.
#### What kind of auth is required
- HubSpot and Mailchimp use OAuth.
- SendGrid uses API keys.
#### Are there existing node modules? (don’t use but check)
- [HubSpot](https://www.npmjs.com/package/hubspot)
- [Mailchimp](https://www.npmjs.com/package/mailchimp-api-v3)
- [SendGrid](https://github.com/sendgrid/sendgrid-nodejs)
#### What API calls will I use?
- Fetching contact from Hubspot
*vid is the objectId pushed from the Hubspot's webhook*
```
GET /contacts/v1/contact/vid/:vid/profile
```
- Adding member to Mailchimp
```
POST https://usX.api.mailchimp.com/3.0/lists/{list_id}/members
```
Example request body:
```
{
    "email_address": "address@example.com",
    "status": "subscribed",
    "tags": ["short", "stout"]
}
```
Full list endpoint documentation [here](https://mailchimp.com/developer/reference/lists/list-members/)
- Sending email with SendGrid
*Header must contain Authorization of type Bearer containing API key*
```
POST https://api.sendgrid.com/v3/mail/send
```
Example request body:
```
{
  "personalizations": [
    {
      "to": [
        {
          "email": "john@example.com"
        }
      ],
      "subject": "Hello, World!"
    }
  ],
  "from": {
    "email": "from_address@example.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Hello, World!"
    }
  ]
}
```
#### How will I register callbacks?
##### Registering webhook in Hubspot

Endpoint:
```
POST https://api.hubapi.com/webhooks/v1/{appId}/subscriptions
```
Example request body:
```
{
  "subscriptionDetails": {
    "subscriptionType": "company.propertyChange",
    "propertyName": "companyname"
  },
  "enabled": false
}
```
#### What data fields will come from/go to APIs (what am I receiving/sending)
- Hubspot webhook test fire result
```
[
    {
        "eventId":"100",
        "subscriptionId":217957,
        "portalId":7075784,
        "occurredAt":1580316962853,
        "subscriptionType":"contact.creation",
        "attemptNumber":0,
        "objectId":123,
        "changeSource":"CRM",
        "changeFlag":"NEW"
    }
]
```
#### Write out mapping of data fields
#### Workflow in terms of API calls
#### Make up use cases
- ex. Create a contact in Mailchimp and add to a list
SendGrid: Send email to this email
Zapier: Trigger an action or workflow