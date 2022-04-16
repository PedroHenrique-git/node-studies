const http = require('http');

const PORT = 5000;

const server = http.createServer();

server.on('request', (req, res) => {
    if(req.url === '/friends') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify({
            id: 1,
            name: 'Sir Isaac Newton'
        }));
        return;
    }

    if(req.url === '/messages') {
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