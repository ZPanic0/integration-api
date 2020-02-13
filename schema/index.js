import { gql } from 'apollo-server-express'
import testData from './testData'
import hubspot from './hubspot'

const gqlString = `
${hubspot.types}
${testData.types}
type Query {
    ${testData.queries}
    ${hubspot.queries}
}
`

export default gql`${gqlString}`
