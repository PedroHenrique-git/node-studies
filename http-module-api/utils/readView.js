const fs = require('fs').promises;

const readView = async (path) => {
    try {
        const view = await fs.readFile(path, { encoding: 'utf-8' });
        return view; 
    } catch(err) {
        console.error('ERR --> ', err);
    }
}

module.exports = {
    readView
}