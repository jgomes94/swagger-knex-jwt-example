'use strict';


var jwt = require('jsonwebtoken');
// Insert your connection to knex: for POSTGRESQL it should be smth in the format of: 
// postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
var knex = require('knex')({
    client: 'postgresql',
    connection: 'putyourstringhere'
});


var config = require('../../config.json')
module.exports = {
    login: login,
    verifyToken: verifyToken
};


function login(req, res) {
    const secretHash = config.secretHash;
    const payload = {
        //Insert here the data to identify which user created the token;
        data: 'my secret data'
    }

    if (req.body.user === 'user@user.com' && req.body.pass === 'password') {
        var token = jwt.sign(payload, secretHash);
        res.json({
            success: true,
            message: 'Token created successfully!',
            token: token
        });
    } else {
        res.json({
            success: false,
            message: 'This user is invalid!',
        });
    }
}

function verifyToken(req, res) {
    //if headers have been sent then it means that it failed in token validation
    if (!res.headersSent) {
        res.json({
            success: true,
            message: 'This token is valid!',
        });
    }

}

