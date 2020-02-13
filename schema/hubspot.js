const queries = `
contacts: [Contact]
`

const types = `
type Contact {
    addedAt: Float
    vid: Int
    canonicalVid: Int
    portalId: Int
    isContact: Boolean
    profileToken: String
    profileUrl: String
    properties: Properties
    hasMore: Boolean
    vidOffset: Int
}

type Properties {
    firstname: String
    lastname: String
    company: String
    lastmodifieddate: Float
}
`

export default { queries, types }
