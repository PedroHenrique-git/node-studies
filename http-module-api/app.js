const http = require('http');
const { readView } = require('./utils/readView');
const { resolve } = require('path');
const { UserController } = require('./controllers/UserController');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (request, response) => {
    const url = request.url;
    const method = request.method;
    const userController = new UserController(request, response);
   
    const isIndex = method === 'GET' && url === '/';
    const isGetUsers = method === 'GET' && url === '/users';
    const isCreateUserGet = method === 'GET' && url === '/create';
    const isCreateUserPost = method === 'POST' && url === '/create'; 

    if(isIndex) return userController.index();
    if(isGetUsers) return userController.getUsers();
    if(isCreateUserGet) return userController.getCreateUser();
    if(isCreateUserPost) return userController.postCreateUser();
    
    const view_404 = await readView(resolve(__dirname, 'views', '404.html'))
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.end(view_404);
});

server.listen(PORT);