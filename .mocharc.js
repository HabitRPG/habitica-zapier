'use strict';

function initCI() {
    var http = require('http');
    var url = require('url');
    var req = http.request({
        ...url.parse(`${process.env.BASE_HABITICA_URI}/api/v3/user/auth/local/register`),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            data = JSON.parse(data);
            process.env.USER_ID = data.data.id;
            process.env.API_KEY = data.data.apiToken;
        });
        run();
    });
    req.write(JSON.stringify({
        "username": "username",
        "email": "email@example.com",
        "password": "password",
        "confirmPassword": "password"
    }));
    req.end();
}

if (process.env.CI === 'true') {
    initCI();
}
module.exports = {
    extension: ['js'],
    delay: process.env.CI === 'true',
};
