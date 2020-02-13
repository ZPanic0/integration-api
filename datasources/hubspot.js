import { RESTDataSource } from 'apollo-datasource-rest'
import { camelCase } from 'lodash'

export default class HubSpotAPI extends RESTDataSource {
    constructor() {
        super()

        this.baseURL = 'https://api.hubapi.com'
    }

    willSendRequest(request) {
        request.headers.set('Authorization', `Bearer ${this.context.hubspot.accessToken}`)
    }

    async getAllContacts() {
        //https://developers.hubspot.com/docs/methods/contacts/get_contacts
        const response = await this.get('contacts/v1/lists/all/contacts/all')

        const result = response.contacts.map(contact => {
            const returnObject = {}

            for (let contactProp in contact) {
                returnObject[camelCase(contactProp)] = contact[contactProp]
            }

            for (let prop in returnObject.properties) {
                returnObject.properties[prop] = returnObject.properties[prop].value
            }
            
            return returnObject
        })

        return result
    }
}
