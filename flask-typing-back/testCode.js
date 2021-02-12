var http = require("http");
var server = http
	.createServer(function (req, res) {
		res.write("this is node js\n");
		res.end();
	})
	.listen(8080);
