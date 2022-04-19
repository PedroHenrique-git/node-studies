const { readView } = require("../utils/readView");
const { resolve } = require("path");
const { getDataFromPost } = require("../utils/getDataFromPost");
const { randomUUID } = require("crypto");
const { DataSource } = require("../dataSource/DataSource");

class UserController {
    constructor(req, res, parameter) {
        this._view = '';
        this._req = req;
        this._res = res;
        this._parameter = parameter; 
        this._dataSource = new DataSource();
    }

    /**
     * @param {string} view
     */
    set view(view) {
        this._view = view;
    }

    get view() {
        return this._view;
    }

    _setContentError(httpError, err) {
        this._res.writeHead(httpError, { 'Content-type': 'application/json' });
        this._res.end({ message: err.message });   
    }

    async index() {
        try {
            this.view = await readView(resolve(__dirname, "..", "views", "index.html"));
            this._res.writeHead(200, { 'Content-type': 'text/html' });
            this._res.end(this.view);
        } catch(err) {
            this._setContentError(500, err);    
        }
    }

    async getCreateUser() {
        try {
            this.view = await readView(resolve(__dirname, "..", "views", "create-user.html"));
            this._res.writeHead(200, { 'Content-type': 'text/html' });
            this._res.end(this.view);    
        } catch(err) {
            this._setContentError(500, err);  
        }
    }

    async postCreateUser() {
        try {
            const data = await getDataFromPost(this._req);
            const [key, value] = data.split('=');
            this._dataSource.setDatOnDataSource({ id: randomUUID(), [key]: value });

            this.view = await readView(resolve(__dirname, "..", "views", "user-created-successfully.html"));
            this._res.writeHead(200, { 'Content-type': 'text/html' });
            this._res.end(this.view);
        } catch(err) {
            this._setContentError(500, err);  
        }
    }

    async updateData() {
        try {
            const data = await getDataFromPost(this._req);
            await this._dataSource.updateDataFromDataSource(this._parameter, JSON.parse(data));

            this.view = await readView(resolve(__dirname, "..", "views", "user-updated-successfully.html"));
            this._res.writeHead(200, { 'Content-type': 'text/html' });
            this._res.end(this.view);
        } catch(err) {
            this._setContentError(500, err);      
        }
    }

    async deleteUser() {
        try {
            await this._dataSource.deleteDataFromDataSource(this._parameter);
            this.view = await readView(resolve(__dirname, "..", "views", "user-deleted-successfully.html"));
            this._res.writeHead(200, { 'Content-type': 'text/html' });
            this._res.end(this.view);
        } catch(err) {
            this._setContentError(500, err);      
        }    
    }

    async getUsers() {
        try {
            const users = await this._dataSource.getData();
            this._res.writeHead(200, { 'Content-type': 'application/json' });
            this._res.end(JSON.stringify(users));      
        } catch(err) {
            this._setContentError(500, err);  
        }
    }

}

module.exports = {
    UserController    
}