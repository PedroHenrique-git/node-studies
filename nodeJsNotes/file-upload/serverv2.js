const formidable = require('formidable');
const http = require('http');
const util = require('util');

http.createServer((req, res) => {
    if(req.url = '/upload' && req.method.toLowerCase() === 'post') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {;
            if(err) {
                res.writeHead(500);
                res.write('Error');
                res.end();
            }

            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload: \n\n');
            res.end(util.inspect({ fields, files }));
        });

        return;
    }

    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`
        <form action="/upload" enctype="multipart/form-data" method="post">
            <input type="text" name="title"/>
            <input type="file" name="upload" multiple="multiple"/>
            <input type="submit" value="upload"/>
        </form>
    `);
}).listen(8000);