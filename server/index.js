const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config')

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) })
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    return server.listen({ port: 5000 })
}).then(res => console.log(`Server running at ${res.url}`)).catch(err => console.log(err))