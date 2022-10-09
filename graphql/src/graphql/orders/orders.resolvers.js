const { getAllProducts } = require('./orders.model');

module.exports = {
    Query: {
        orders: () => getAllProducts() 
    }
}