var connect = require('connect');
var http = require('http');
var net = require('net');

var app = connect();

// require request-ip and register it as middleware
var requestIp = require('request-ip');

// you can override which attirbute the ip will be set on by
// passing in an options object with an attributeName
app.use(requestIp.mw({ attributeName : 'myCustomAttributeName' }))

var ipaddress;
var iptype;
// respond to all requests
app.use(function(req, res) {

    // use our custom attributeName that we registered in the middleware
    var ip = req.myCustomAttributeName;
    console.log(ip);
	ipaddress=ip;
    // https://nodejs.org/api/net.html#net_net_isip_input
    var ipType = net.isIP(ip); // returns 0 for invalid, 4 for IPv4, and 6 for IPv6
	iptype = ipType;
    res.end('Hello, your ip address is ' + ip + ' and is of type IPv' + ipType + '\n');
});

module.exports.hello = function(val){
	console.log("hello " + val +" " + new Date()+"\tYour current ip is " + ipaddress +",ipType = " + iptype);
}