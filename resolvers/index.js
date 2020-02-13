import books from '../datasources/testData'

const resolvers = {
    Query: {
        books: () => books,
        contacts: async (_, __, context) => await context.dataSources.hubspotAPI.getAllContacts()
    }
}

export default resolvers