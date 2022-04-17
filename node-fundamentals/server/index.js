const http = require('http');

const PORT = 5000;

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Sir Isaac Newton'
    },
    {
        id: 1,
        name: 'Albert Einstein'
    },
];

server.on('request', (req, res) => {
    const items = req.url.split('/');

    console.log('ITEMS --> ', items);

    if(req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('REQUEST: ', friend);
            friends.push(JSON.parse(friend));
        });

        req.pipe(res);

        return;
    }

    if(req.method === 'GET' && items[1] === 'friends') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });

        if(items.length !== 3) {
            res.end(JSON.stringify(friends));
            return;
        }

        const friendIndex = Number(items[2]);
        res.end(JSON.stringify(friends[friendIndex]))
        return;
    }

    if(items[1] === 'messages') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on astronomy?</li>');     
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
        return;
    }

    res.writeHead(404);
    res.end('Page not found!');
});

server.listen(PORT);