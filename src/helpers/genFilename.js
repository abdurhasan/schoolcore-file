const path = require('path');
const uniqueCode = require('./uniqueCode');

module.exports = filename =>{
    return filename.replace(/ /g,'').replace(/(\.[\w\d_-]+)$/i,`-${uniqueCode(4)}${path.extname(filename)}`)
}