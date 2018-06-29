'use strict';

var jwt = require('jsonwebtoken');
var config = require('../../config.json')

exports.verifyToken = function (req, authOrSecDef, token, callback) {
    const secretHash = config.secretHash;
    function sendError() {
        return req.res.status(403).json({ message: 'Error: Access Denied' });
    }
   
    jwt.verify(token, secretHash, function (err, decodedToken) {
        if (err)
            return callback(sendError());
        return callback(null);
    });

}
