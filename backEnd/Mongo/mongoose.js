const crypto = require('crypto');
crypto.randomBytes(256).toString('hex');
module.exports = {
    uri: 'mongodb://localhost:27017/blog',
    secret: crypto
}