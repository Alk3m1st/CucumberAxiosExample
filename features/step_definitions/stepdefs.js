const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const axios = require('axios');

async function isTheWebServerAlive(url) {
    let response = await axios.get('https://www.google.com')

    // console.log(`Status: ${response.status}`);
    // console.log(`Status: ${response.headers['content-type']}`);
    // console.log(response.duration)

    return response;
}

Given('we visit the web server root domain', function () {
    this.url = 'https://www.google.com';
});

When('we send a HTTP request', async function () {
    this.response = await isTheWebServerAlive(this.url);
});

Then('we should see a status code of {int}', function (statusCode) {
    assert.equal(this.response.status, statusCode);
});

// Axios interceptors, needed to check the response time
axios.interceptors.request.use(function (config) {
    config.metadata = { startTime: new Date()}
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
}, function (error) {
    error.config.metadata.endTime = new Date();
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
});