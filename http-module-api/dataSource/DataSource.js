const { resolve } = require("path");
const { USERS_DATA_SOURCE } = require("../model/UserModel");

class DataSource {
    constructor() {
        this._dataSource = USERS_DATA_SOURCE;
    }

    getData() {
        return new Promise((resolve) => {
            resolve(USERS_DATA_SOURCE);
        });
    }

    setDatOnDataSource(data) {
        return new Promise((resolve, reject) => {
            if(!data) {
                reject({ message: 'no data was sent' });
            }
    
            this._dataSource.push(data);
    
            resolve(true);
        })
    }

    updateDataFromDataSource(id, requestData) {
        return new Promise((resolve, reject) => {
            if(!id) reject({ message: 'no data was sent' });

            const data = this._dataSource.find((data) => String(data.id) === String(id));
    
            if(!data) reject({ message: 'id not found' });
    
            const { first_name } = requestData;

            this._dataSource = this._dataSource.map((data) => {
                if(data.id === id) {
                    data['first_name'] = first_name;
                    return data; 
                }

                return data;
            }); 

            resolve(true);
        })
    }

    deleteDataFromDataSource(id) {
        return new Promise((resolve, reject) => {
            if(!id) reject({ message: 'no data was sent' });
            
            const data = this._dataSource.find((data) => String(data.id) === String(id));
    
            if(!data) reject({ message: 'id not found' });

            this._dataSource = this._dataSource.filter((data) => data.id !== id);

            resolve(true);
        })
    }
}

module.exports = {
    DataSource
}