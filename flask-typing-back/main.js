const gtd = require("./getTypingData.js");

const http = require("http");

const hostname = "localhost";
const port = 3002;

const server = http.createServer((req, res) => {
	res.statusCode = 200;

	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "OPTIONS, POST, GET",
		//"Access-Control-Max-Age": 2592000, // 30 days
		/** add other headers as per requirement */
	};

	res.writeHead(200, headers);

	let typingData = gtd.getTypingData("data2");

	questions = JSON.stringify({
		questions: typingData,
	});

	res.write(questions);

	res.end();
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
