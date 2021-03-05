const gtd = require("./getTypingData.js");
const gtm = require("./getMenu.js");

const hostData = require("./hostData.js");

const http = require("http");

const url = require("url");

const hostname = hostData.hostname;
const port = hostData.port;

const qidFirst = "data1";

const server = http.createServer((req, res) => {
	res.statusCode = 200;

	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "OPTIONS, POST, GET",
		//"Access-Control-Max-Age": 2592000, // 30 days
		/** add other headers as per requirement */
	};

	if (req.method === "GET") {
		res.writeHead(200, headers);
		const myUrl = new URL(`http://${hostname}:${port}` + req.url);

		sendQuestions(res, myUrl);
		sendMunu(res, myUrl);
	}

	res.end();
});

function sendQuestions(res, myUrl) {
	let qid = myUrl.searchParams.get("qid");
	if (qid == null) {
		return;
	}

	const typingData = gtd.getTypingData(qid);
	sendData = JSON.stringify({
		questions: typingData,
	});

	res.write(sendData);
}

function sendMunu(res, myUrl) {
	const menuFilter = myUrl.searchParams.get("menu");
	if (menuFilter == null) {
		return;
	}

	const meunData = gtm.getMenu("all");
	res.write(meunData);
}

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	console.log(`Server running at http://${hostname}:${port}/?qid=data1`);
	console.log(`Server running at http://${hostname}:${port}/?menu=all`);
});
