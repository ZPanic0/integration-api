import { gql } from 'apollo-server-express'
import testData from './testData'

export default gql`
${testData}
`