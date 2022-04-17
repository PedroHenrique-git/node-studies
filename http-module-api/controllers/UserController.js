const { readView } = require("../utils/readView");
const { resolve } = require("path");
const { USERS_DATA_SOURCE } = require("../model/UserModel");
const { getDataFromPost } = require("../utils/getDataFromPost");

class UserController {
    constructor(req, res) {
        this._view = '';
        this._req = req;
        this._res = res;
        this._datasource = USERS_DATA_SOURCE;
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
            const user = await getDataFromPost(this._req);
            this._datasource.push(JSON.parse(user));
            this.view = await readView(resolve(__dirname, "..", "views", "user-created-successfully.html"));
            this._res.writeHead(200, { 'Content-type': 'text/html' });
            this._res.end(this.view);
        } catch(err) {
            this._setContentError(500, err);  
        }
    }

    getUsers() {
        try {
            this._res.writeHead(200, { 'Content-type': 'application/json' });
            this._res.end(JSON.stringify(this._datasource));      
        } catch(err) {
            this._setContentError(500, err);  
        }
    }

}

module.exports = {
    UserController    
}