const express = require('express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express')

const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const resolversArray = loadFilesSync('**/*', {
    extensions: ['resolvers.js']
})

async function startApolloServer() {
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray
    })

    const server = new ApolloServer({
        schema
    })

    await server.start()
    server.applyMiddleware({ app, path: '/graphql' })

    app.listen(300, () => {
        console.log('Running graphql server...')
    })
}

startApolloServer()

/*
    express-graphql implementation

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: {
            orders,
            products
        },
        graphiql: true
    }));
*/