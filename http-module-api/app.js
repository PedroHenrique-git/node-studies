const http = require('http');
const { readView } = require('./utils/readView');
const { resolve } = require('path');
const { UserController } = require('./controllers/UserController');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (request, response) => {
    const url = request.url;
    const method = request.method;
    const splitUrl = url.split('/');
    const userController = new UserController(request, response, splitUrl[2] || '');
   
    const isIndex = method === 'GET' && url === '/';
    const isGetUsers = method === 'GET' && url === '/users';
    const isCreateUserGet = method === 'GET' && url === '/create';
    const isCreateUserPost = method === 'POST' && url === '/create';
    const isUpdateUserPatch = method === 'PATCH' && splitUrl[1] === 'update' && splitUrl[2];
    const isDeleteUser = method === 'DELETE' && splitUrl[1] === 'delete' && splitUrl[2];  

    if(isIndex) return userController.index();
    if(isGetUsers) return userController.getUsers();
    if(isCreateUserGet) return userController.getCreateUser();
    if(isCreateUserPost) return userController.postCreateUser();
    if(isUpdateUserPatch) return userController.updateData();
    if(isDeleteUser) return userController.deleteUser(); 
    
    const view_404 = await readView(resolve(__dirname, 'views', '404.html'))
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.end(view_404);
});

server.listen(PORT);