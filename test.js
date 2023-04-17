var request = require('request');

var endPoint = 'https://api.coin.z.com/public';
var path     = '/v1/status';

request(endPoint + path, function (err, response, payload) {
    console.log(JSON.stringify(JSON.parse(payload), null, 2));
});