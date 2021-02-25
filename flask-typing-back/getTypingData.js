const typingDataPath = "/TypingData/";
const fs = require("fs");
const csv = require("csv-parse/lib/sync");

exports.getTypingData = function (qId) {
	let tdp = typingDataPath + qId + ".csv";

	let typingData = [];

	try {

		let tmpDt = fs.readFileSync(__dirname + tdp);

		let res = csv(tmpDt);

		for (var i = 0; i < res.length; i++) {
			typingData[i] = res[i][0];
		}
	} catch (error) {
		console.log(error);
	}
	return typingData;
};
