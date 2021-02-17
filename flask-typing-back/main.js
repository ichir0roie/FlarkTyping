const gtd = require("./getTypingData.js");

const http = require("http");

const url = require('url');

const hostname = "localhost";
const port = 3002;

const qidFirst="data1";

const server = http.createServer((req, res) => {
	res.statusCode = 200;

	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "OPTIONS, POST, GET",
		//"Access-Control-Max-Age": 2592000, // 30 days
		/** add other headers as per requirement */
	};

	if(req.method==="GET"){
		res.writeHead(200, headers);

		var myUrl = new URL(`http://${hostname}:${port}`+req.url);
		var qid = myUrl.searchParams.get('qid')

		if(qid==null){
			qid=qidFirst;
		}

		let typingData = gtd.getTypingData(qid);
	
		questions = JSON.stringify({
			questions: typingData,
		});
	
		res.write(questions);
	
	}

	res.end();
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
