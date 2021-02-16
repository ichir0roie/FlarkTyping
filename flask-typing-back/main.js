typingDataPath = "/TypingData/";
typingDataName = "data1";
const tdp = typingDataPath + typingDataName + ".csv";

const fs = require("fs");
const csv = require("csv-parse/lib/sync");

typingData = [];

let tmpDt = fs.readFileSync(__dirname + tdp);
let res = csv(tmpDt);

for (var i = 0; i < res.length; i++) {
	typingData[i] = res[i][0];
}

for (var i = 0; i < typingData.length; i++) {
	console.log(typingData[i]);
}

const http = require("http");

const hostname = "localhost";
const port = 3002;

const server = http.createServer((req, res) => {
	res.statusCode = 200;

	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "OPTIONS, POST, GET",
		"Access-Control-Max-Age": 2592000, // 30 days
		/** add other headers as per requirement */
	};

	res.writeHead(200, headers);

	questions = JSON.stringify({
		questions: typingData,
	});

	res.write(questions);

	res.end();
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
