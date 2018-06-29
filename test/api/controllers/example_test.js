var assert = require('assert');
var request = require('request')
var expect = require("chai").expect;

describe('Authentication Tests', () => {
    it('Should get a valid token and validate it.', (done) => {
        request.post({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: 'http://localhost:10010/v1/login',
            body: "user=user@user.com&pass=password"
        }, (error, response, body) => {
            try {
                expect(error).to.equal(null);
                var jsBody = JSON.parse(body);
                console.log('jsBody on authenticate test.. response to login');
                console.log(jsBody);
                expect(jsBody.success).to.equal(true);
                expect(jsBody.token).to.not.equal(undefined);
            } catch (exception) {
                console.log(exception);
                process.exit(1); // fail the tests. 
            }
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': jsBody.token },
                url: 'http://localhost:10010/v1/verifyToken'
            }, (error, response, body) => {
                try {
                    expect(error).to.equal(null);
                    var jsBody = JSON.parse(body);
                    console.log('jsBody on authenticate test.. response to verify/token');
                    console.log(jsBody);
                    expect(jsBody.success).to.equal(true);
                    expect(jsBody.message).to.not.equal(undefined);
                    console.log('authenticate_test  done');
                } catch (exception) {
                    console.log(exception);
                    process.exit(1); // fail the tests. 
                }
                done();

            });
        });
    });
});