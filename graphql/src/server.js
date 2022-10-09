const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { orders } = require('./graphql/orders/orders.model');
const { products } = require('./graphql/products/products.model')

const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const schema = makeExecutableSchema({
    typeDefs: typesArray
})

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
        orders,
        products
    },
    graphiql: true
}));

app.listen(3000, () => {
    console.log('running graphql server...')
});