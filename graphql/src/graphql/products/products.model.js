const products = [
    { 
        id: '1',
        description: 'Red shoe',
        price: 42.12
    },
    { 
        id: '2',
        description: 'Blue jeans',
        price: 52.12
    }
]

function getAllProducts() {
    return products; 
}

function getProductById(id) {
    return products.find(product => product.id === id)
}

function getProductByPriceRange(min, max) {
    return products.filter(product => product.price >= min && product.price <= max)
}

function addProduct(id, description, price) {
    return products.push({
        description,
        id,
        price
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductByPriceRange,
    addProduct
}