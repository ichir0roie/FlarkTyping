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
	res.setHeader("Content-Type", "text/plain");
	res.end("Hello World");
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
