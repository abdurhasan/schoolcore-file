const jwt = require('jwt-simple');
const ENV = require('@env');
const response = require('./response')

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    req.local = new Object;

    if (!authorization) {
        return res.status(403).json(response(false, 'Authorization header is not exist !'));
    }
    try {                       
        const verifiedToken = jwt.decode(authorization, ENV.JWT_SECRET);
        req.local.username = verifiedToken.username;
        req.local.bucketName = verifiedToken.bucket ? verifiedToken.bucket : 'image';
        next()
    } catch (error) {
        
        return res.status(401).json(response(false, 'Unauthorized error', {err:error}));
    }    
};




module.exports = auth;

