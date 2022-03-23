const sayHello = (req, res, next) => {
    res.send({
        name: 'test',
    });
}

module.exports = sayHello