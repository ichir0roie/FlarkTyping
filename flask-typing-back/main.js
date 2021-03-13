const gtd = require("./getDataTyping.js");
const gtm = require("./getMenu.js");

const hostData = require("./hostData.js");

const adminRanking = require("./adminRanking.js");
const adminUser = require("./adminUser.js");

const http = require("http");

const url = require("url");
const { urlencoded } = require("express");

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

		checkSendQuestions(res, myUrl);
		checkSendMunu(res, myUrl);
		checkEntryResult(res, myUrl);
		checkGetUserName(res, myUrl);
	}
});

function checkGetUserName(res, myUrl) {
	let data = myUrl.searchParams.get("email");
	if (data == null) {
		return;
	}
	adminUser.getUserName(data).then((userName_) => {
		const sendData = JSON.stringify({
			userName: userName_,
		});
		res.write(sendData);
		res.end();
	});
}

function checkEntryResult(res, myUrl) {
	const result = myUrl.searchParams.get("result");
	if (result == null) {
		return;
	}
	let data = JSON.parse(result);

	const qId = data.qId;
	const userId = data.userId;
	let lenPerMin = data.lenPerMin;
	if (qId != null && userId != null && lenPerMin != null) {
		adminRanking.rankingEnrty(qId, userId, lenPerMin);
	}
	res.end();
}

function checkSendQuestions(res, myUrl) {
	let qid = myUrl.searchParams.get("qid");
	if (qid == null) {
		return;
	}

	const DataTyping = gtd.getDataTyping(qid);
	const sendData = JSON.stringify({
		questions: DataTyping,
	});

	res.write(sendData);
	res.end();
}

function checkSendMunu(res, myUrl) {
	const menuFilter = myUrl.searchParams.get("menu");
	if (menuFilter == null) {
		return;
	}

	const meunData = gtm.getMenu("all");
	res.write(meunData);
	res.end();
}

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	console.log(`Server running at http://${hostname}:${port}/?qid=data1`);
	console.log(`Server running at http://${hostname}:${port}/?menu=all`);
});
