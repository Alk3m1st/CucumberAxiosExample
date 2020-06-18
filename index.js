const axios = require('axios');

// Non cucumber example just to test axios can return properties we need to assert on
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

axios.get('https://www.google.com')
  .then(response => {
    //console.log(response);
    console.log(`Status: ${response.status}`);
    console.log(`Status: ${response.headers['content-type']}`);
    console.log(response.duration)
  })
  .catch(error => {
    console.log(error);
  });