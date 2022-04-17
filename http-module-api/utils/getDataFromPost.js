const getDataFromPost = (req) => {
    return new Promise((resolve) => {
        let obj = '';

        req.on('data', (chunk) => {
            obj += chunk.toString();
        });

        req.on('end', () => {
            resolve(obj);
        });
    });
}

module.exports = {
    getDataFromPost
}