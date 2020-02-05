import books from '../datasources/testData'

const resolvers = {
    Query: {
        books: () => books
    }
}

export default resolvers