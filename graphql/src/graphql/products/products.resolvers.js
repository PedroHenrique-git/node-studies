const { 
    getAllProducts, 
    getProductById,
    getProductByPriceRange,
    addProduct
} = require('./products.model');

module.exports = {
    Query: {
        products: () => getAllProducts(),
        productById: (_, args) => getProductById(args.id),
        productByPriceRange: (_, args) => getProductByPriceRange(args.min, args.max)
    },
    Mutation: {
        addProduct: (_, args) => addProduct(args.id, args.description, args.price)
    }
}